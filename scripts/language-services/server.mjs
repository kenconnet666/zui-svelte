import { requireProject, root as configuredRoot, serviceConfig } from './environment.mjs';
import { spawn, execFileSync } from 'node:child_process';
import { watch, existsSync } from 'node:fs';
import { readFile, realpath, readdir } from 'node:fs/promises';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const { McpServer } = requireProject('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = requireProject('@modelcontextprotocol/sdk/server/stdio.js');
const { createMessageConnection, StreamMessageReader, StreamMessageWriter } =
  requireProject('vscode-jsonrpc/node.js');
// 使用 Zod 4 自带的 v3 兼容入口，保持已有 MCP schema 协议；产品仍使用 Zod 4。
const { z } = requireProject('zod/v3');
const root = await realpath(configuredRoot);
const services = new Map();
const activeChildren = new Map();
const children = new Set();
const supported = new Set([
  '.ts',
  '.tsx',
  '.mts',
  '.cts',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.svelte',
]);

async function document(filePath) {
  const absolute = await realpath(resolve(root, filePath));
  const fromRoot = relative(root, absolute);
  if (isAbsolute(fromRoot) || fromRoot === '..' || fromRoot.startsWith('..' + sep))
    throw new Error('File is outside the configured workspace.');
  const extension = extname(absolute);
  if (!supported.has(extension)) throw new Error('Unsupported source file extension: ' + extension);
  return {
    path: absolute,
    relativePath: fromRoot,
    uri: pathToFileURL(absolute).href,
    text: await readFile(absolute, 'utf8'),
    kind: extension === '.svelte' ? 'svelte' : 'typescript',
    languageId:
      extension === '.svelte'
        ? 'svelte'
        : extension === '.tsx'
          ? 'typescriptreact'
          : extension === '.jsx'
            ? 'javascriptreact'
            : ['.js', '.mjs', '.cjs'].includes(extension)
              ? 'javascript'
              : 'typescript',
  };
}

function stop(child) {
  if (child.exitCode !== null || child.killed) return;
  // 只清理自己创建的语言服务进程树，不触碰 IDE 或其他任务的 Node 进程。
  if (process.platform === 'win32') {
    try {
      execFileSync('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], {
        windowsHide: true,
        stdio: 'ignore',
      });
    } catch {
      /* 进程可能已自行退出。 */
    }
  } else child.kill();
}

async function start(kind) {
  const config = serviceConfig(kind);
  const child = spawn(config.bin, config.args, { cwd: root, stdio: 'pipe', windowsHide: true });
  children.add(child);
  activeChildren.set(kind, child);
  child.on('exit', () => {
    children.delete(child);
    if (activeChildren.get(kind) === child) {
      activeChildren.delete(kind);
      services.delete(kind);
    }
  });
  child.stderr.on('data', (data) => process.stderr.write(data));
  const connection = createMessageConnection(
    new StreamMessageReader(child.stdout),
    new StreamMessageWriter(child.stdin),
  );
  const watchers = new Map();
  const rescan = new Set();
  let disposed = false;
  const changed = new Map();
  let refreshTimer;
  child.on('exit', () => {
    disposed = true;
    clearTimeout(refreshTimer);
    for (const watcher of watchers.values()) watcher.close();
    watchers.clear();
    connection.dispose();
  });
  child.on('error', () => connection.dispose());
  connection.onRequest('workspace/configuration', ({ items }) => items.map(() => ({})));
  connection.onRequest('client/registerCapability', () => null);
  connection.onRequest('client/unregisterCapability', () => null);
  connection.onRequest('window/workDoneProgress/create', () => null);
  connection.onRequest('workspace/diagnostic/refresh', () => null);
  connection.onRequest('workspace/applyEdit', () => ({
    applied: false,
    failureReason: 'Read-only language bridge.',
  }));
  connection.listen();
  async function request(method, params) {
    let timer;
    try {
      return await Promise.race([
        connection.sendRequest(method, params),
        new Promise((_, reject) => {
          timer = setTimeout(() => {
            stop(child);
            reject(new Error('Language service request did not complete: ' + method));
          }, 45000);
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
  }
  try {
    const initialized = await request('initialize', {
      processId: process.pid,
      clientInfo: { name: 'Codex ZUI language bridge', version: '1' },
      rootUri: pathToFileURL(root).href,
      workspaceFolders: [{ name: 'zui-svelte', uri: pathToFileURL(root).href }],
      capabilities: {
        workspace: { configuration: true },
        textDocument: {
          hover: { contentFormat: ['markdown', 'plaintext'] },
          definition: { linkSupport: true },
          diagnostic: {},
          publishDiagnostics: { versionSupport: true },
          completion: {
            completionItem: {
              snippetSupport: false,
              documentationFormat: ['markdown', 'plaintext'],
              resolveSupport: { properties: ['documentation', 'detail', 'additionalTextEdits'] },
            },
          },
        },
      },
      initializationOptions: config.initializationOptions,
    });
    await connection.sendNotification('initialized', {});
    // 父目录只监听自身；源码/声明目录递归监听，不进入 node_modules。
    const relevant = /\.(?:[cm]?[jt]sx?|svelte|json|yaml)$/u;
    const notifyFile = (path) => {
      const uri = pathToFileURL(path).href;
      changed.set(uri, { uri, type: existsSync(path) ? 2 : 3 });
    };
    const schedule = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(async () => {
        try {
          const folders = [...rescan];
          rescan.clear();
          for (const folder of folders) {
            const files = await readdir(folder, { recursive: true }).catch((error) => {
              if (error.code === 'ENOENT') return [];
              throw error;
            });
            for (const file of files) if (relevant.test(file)) notifyFile(resolve(folder, file));
          }
          if (disposed) return;
          const changes = [...changed.values()];
          changed.clear();
          if (changes.length)
            await connection.sendNotification('workspace/didChangeWatchedFiles', { changes });
        } catch (error) {
          if (!disposed) process.stderr.write('Language refresh: ' + error.message + '\n');
        }
      }, 60);
    };
    const installWatcher = (directory) => {
      const folder = resolve(root, directory);
      watchers.get(directory)?.close();
      watchers.delete(directory);
      if (disposed || !existsSync(folder)) return;
      const watcher = watch(folder, { recursive: directory.includes('/') }, (_event, filename) => {
        if (disposed || !filename) return;
        const name = filename.toString();
        if (directory && !directory.includes('/') && ['src', 'dist'].includes(name)) {
          // build 清空并重建 dist 后重新挂接，并补发重建期间可能遗漏的文件变化。
          installWatcher(directory + '/' + name);
          rescan.add(resolve(folder, name));
          schedule();
          return;
        }
        if (!relevant.test(name)) return;
        notifyFile(resolve(folder, name));
        schedule();
      });
      watcher.on('error', (error) => {
        if (!disposed && !['ENOENT', 'EPERM'].includes(error.code))
          process.stderr.write('Language watcher: ' + error.message + '\n');
      });
      watchers.set(directory, watcher);
    };
    for (const directory of [
      '',
      'core',
      'svelte',
      'docs',
      'core/src',
      'core/dist',
      'svelte/src',
      'svelte/dist',
      'docs/src',
    ])
      installWatcher(directory);
    const versions = new Map();
    let queue = Promise.resolve();
    return {
      capabilities: initialized.capabilities,
      request,
      run(doc, action) {
        // 同一服务内串行刷新文档，避免并行查询把不同版本的诊断混在一起。
        const result = queue
          .catch(() => {})
          .then(async () => {
            const version = (versions.get(doc.uri) ?? 0) + 1;
            await connection.sendNotification(
              version === 1 ? 'textDocument/didOpen' : 'textDocument/didChange',
              version === 1
                ? {
                    textDocument: {
                      uri: doc.uri,
                      languageId: doc.languageId,
                      version,
                      text: doc.text,
                    },
                  }
                : { textDocument: { uri: doc.uri, version }, contentChanges: [{ text: doc.text }] },
            );
            versions.set(doc.uri, version);
            try {
              return await action(version);
            } finally {
              // 只读探针不持有编辑器缓冲区；关闭后让依赖回到磁盘版本，避免覆盖真实编辑。
              await connection.sendNotification('textDocument/didClose', {
                textDocument: { uri: doc.uri },
              });
              versions.delete(doc.uri);
            }
          });
        queue = result;
        return result;
      },
    };
  } catch (error) {
    stop(child);
    throw error;
  }
}

async function service(kind) {
  let pending = services.get(kind);
  if (!pending) {
    pending = start(kind).catch((error) => {
      if (services.get(kind) === pending) services.delete(kind);
      throw error;
    });
    services.set(kind, pending);
  }
  return pending;
}

function range(value) {
  return (
    value && {
      start: { line: value.start.line + 1, column: value.start.character + 1 },
      end: { line: value.end.line + 1, column: value.end.character + 1 },
    }
  );
}
function position(doc, line, column) {
  const lines = doc.text.split('\n');
  if (line > lines.length || column > lines[line - 1].length + 1)
    throw new Error('Position is outside the document.');
  return { line: line - 1, character: column - 1 };
}
function offsetPosition(text, offset) {
  const before = text.slice(0, offset);
  return { line: before.split('\n').length, column: offset - before.lastIndexOf('\n') };
}

const server = new McpServer({ name: 'zui-language-services', version: '1.0.0' });
const file = { filePath: z.string().describe('Project-relative path inside ' + root) };
const location = { ...file, line: z.number().int().min(1), column: z.number().int().min(1) };
function tool(name, description, inputSchema, read) {
  server.registerTool(
    name,
    {
      description,
      inputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const doc = await document(args.filePath);
        const language = await service(doc.kind);
        const result = await language.run(doc, (version) => read(args, doc, language, version));
        return { content: [{ type: 'text', text: JSON.stringify(result) }] };
      } catch (error) {
        return { isError: true, content: [{ type: 'text', text: String(error) }] };
      }
    },
  );
}

tool(
  'hover',
  'Get semantic TypeScript/Svelte type information. Input and output positions are 1-based.',
  location,
  async (args, doc, language) => {
    const result = await language.request('textDocument/hover', {
      textDocument: { uri: doc.uri },
      position: position(doc, args.line, args.column),
    });
    return {
      filePath: doc.relativePath,
      contents: result?.contents ?? null,
      range: range(result?.range),
    };
  },
);

for (const [name, method] of [
  ['definitions', 'textDocument/definition'],
  ['references', 'textDocument/references'],
]) {
  tool(
    name,
    'Find ' + name + ' using the project language service. Positions are 1-based.',
    { ...location, limit: z.number().int().min(1).max(500).default(100) },
    async (args, doc, language) => {
      const result = await language.request(method, {
        textDocument: { uri: doc.uri },
        position: position(doc, args.line, args.column),
        context: { includeDeclaration: true },
      });
      const items = result == null ? [] : Array.isArray(result) ? result : [result];
      return {
        total: items.length,
        items: items.slice(0, args.limit).map((item) => {
          const uri = item.targetUri ?? item.uri;
          return {
            filePath: uri.startsWith('file:') ? fileURLToPath(uri) : uri,
            range: range(item.targetSelectionRange ?? item.range),
          };
        }),
      };
    },
  );
}

tool(
  'completions',
  'Get type-aware completions; filter by prefix to keep large CSS property lists concise.',
  {
    ...location,
    prefix: z.string().default(''),
    limit: z.number().int().min(1).max(200).default(40),
    resolveLimit: z
      .number()
      .int()
      .min(0)
      .max(20)
      .default(0)
      .describe('Resolve documentation/details for at most this many returned items.'),
  },
  async (args, doc, language) => {
    const result = await language.request('textDocument/completion', {
      textDocument: { uri: doc.uri },
      position: position(doc, args.line, args.column),
    });
    const items = (Array.isArray(result) ? result : (result?.items ?? [])).filter((item) =>
      item.label.startsWith(args.prefix),
    );
    const selected = items.slice(0, args.limit);
    if (language.capabilities.completionProvider?.resolveProvider) {
      for (let i = 0; i < Math.min(args.resolveLimit, selected.length); i++) {
        selected[i] = {
          ...selected[i],
          ...(await language.request('completionItem/resolve', selected[i])),
        };
      }
    }
    return {
      total: items.length,
      editPositions: 'LSP zero-based UTF-16',
      isIncomplete: !Array.isArray(result) && Boolean(result?.isIncomplete),
      itemDefaults: !Array.isArray(result) ? result?.itemDefaults : undefined,
      items: selected.map(
        ({
          label,
          labelDetails,
          kind,
          detail,
          documentation,
          sortText,
          filterText,
          insertText,
          insertTextFormat,
          textEdit,
          additionalTextEdits,
          tags,
          deprecated,
        }) => ({
          label,
          labelDetails,
          kind,
          detail,
          documentation,
          sortText,
          filterText,
          insertText,
          insertTextFormat,
          textEdit,
          additionalTextEdits,
          tags,
          deprecated,
        }),
      ),
    };
  },
);

tool(
  'diagnostics',
  'Get completed diagnostics for one file. Uses Svelte pull diagnostics and synchronous TypeScript semantic/syntax requests; a timeout is an error, never an empty success. Full-project checks remain separate.',
  file,
  async (_args, doc, language, version) => {
    let diagnostics;
    if (doc.kind === 'svelte') {
      if (!language.capabilities.diagnosticProvider)
        throw new Error('Svelte server does not support pull diagnostics.');
      const result = await language.request('textDocument/diagnostic', {
        textDocument: { uri: doc.uri },
      });
      if (result?.kind !== 'full')
        throw new Error('Svelte did not return a complete diagnostic report.');
      diagnostics = result.items.map((item) => ({
        code: item.code,
        severity: item.severity,
        message: item.message,
        range: range(item.range),
        source: item.source,
      }));
    } else {
      const results = await Promise.all(
        ['syntacticDiagnosticsSync', 'semanticDiagnosticsSync'].map((command) =>
          language.request('workspace/executeCommand', {
            command: 'typescript.tsserverRequest',
            arguments: [
              command,
              { file: doc.uri, includeLinePosition: true },
              { executionTarget: 0 },
            ],
          }),
        ),
      );
      diagnostics = results.flatMap((result) => {
        if (!result?.success || !Array.isArray(result.body))
          throw new Error('TypeScript did not complete its diagnostic request.');
        return result.body.map((item) => ({
          code: item.code,
          severity: item.category === 'error' ? 1 : 2,
          message: item.text ?? item.message ?? item.messageText,
          range: {
            start: item.startLocation
              ? { line: item.startLocation.line, column: item.startLocation.offset }
              : offsetPosition(doc.text, item.start),
            end: item.endLocation
              ? { line: item.endLocation.line, column: item.endLocation.offset }
              : offsetPosition(doc.text, item.start + item.length),
          },
          source: 'typescript',
        }));
      });
    }
    return {
      filePath: doc.relativePath,
      language: doc.kind,
      documentVersion: version,
      complete: true,
      errors: diagnostics.filter((item) => item.severity === 1).length,
      diagnostics,
    };
  },
);

let closing = false;
function close() {
  if (closing) return;
  closing = true;
  for (const child of children) stop(child);
  void server.close().finally(() => process.exit(0));
}
process.stdin.on('end', close);
process.on('SIGINT', close);
process.on('SIGTERM', close);
process.on('exit', () => {
  for (const child of children) stop(child);
});
await server.connect(new StdioServerTransport());
