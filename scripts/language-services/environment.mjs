import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const directory = dirname(fileURLToPath(import.meta.url));
export const root = resolve(process.argv[2] ?? resolve(directory, '../..'));
export const toolDirectory = resolve(
  process.argv[3] ??
    resolve(process.env.CODEX_HOME ?? resolve(homedir(), '.codex'), 'tools/zui-language-services'),
);
// 工具依赖独立安装在用户目录，不进入产品依赖或构建产物。
export const requireTool = createRequire(resolve(toolDirectory, 'package.json'));

export function serviceConfig(kind) {
  if (kind === 'svelte')
    return {
      bin: process.execPath,
      args: [requireTool.resolve('svelte-language-server/bin/server.js'), '--stdio'],
    };
  return {
    bin: process.execPath,
    args: [requireTool.resolve('typescript-language-server/lib/cli.mjs'), '--stdio'],
    initializationOptions: {
      hostInfo: 'Codex ZUI',
      disableAutomaticTypingAcquisition: true,
      // 只使用完整语义服务，避免尚未就绪的 syntax server 返回 any。
      tsserver: { path: resolve(root, 'node_modules/typescript/lib'), useSyntaxServer: 'never' },
      plugins: [
        { name: 'typescript-svelte-plugin', location: toolDirectory, languages: ['svelte'] },
      ],
    },
  };
}
