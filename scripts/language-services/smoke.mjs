import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// 输入来自 codex mcp get --json，验证实际配置，避免探针与宿主使用不同路径。
let input = '';
for await (const chunk of process.stdin) input += chunk;
for (const configuration of JSON.parse(input)) {
  assert(configuration.enabled, `${configuration.name} is disabled`);
  const { command, args, cwd } = configuration.transport;
  const transport = new StdioClientTransport({ command, args, cwd, stderr: 'pipe' });
  transport.stderr?.on('data', (data) => process.stderr.write(data));
  const client = new Client({ name: 'zui-config-smoke', version: '1' });
  try {
    await client.connect(transport, { timeout: 30000 });
    const { tools } = await client.listTools();
    const expected = configuration.name === 'zui_lsp' ? 'diagnostics' : 'svelte-autofixer';
    assert(
      tools.some((tool) => tool.name === expected),
      `Missing ${expected}`,
    );
    console.log(
      JSON.stringify({ server: configuration.name, tools: tools.map((tool) => tool.name) }),
    );
  } finally {
    await client.close();
  }
}
