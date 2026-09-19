import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const directory = dirname(fileURLToPath(import.meta.url));
export const root = resolve(process.argv[2] ?? resolve(directory, '../..'));
// MCP 宿主与语言服务均复用项目开发依赖，不再需要用户目录中的另一套安装。
export const requireProject = createRequire(resolve(root, 'package.json'));

function projectEntry(packageName, entry) {
  // 使用项目的显式包路径，缺少依赖时直接报错，不悄悄回退到用户目录中的另一版。
  return requireProject.resolve(resolve(root, 'node_modules', packageName, entry));
}

export function serviceConfig(kind) {
  if (kind === 'svelte')
    return {
      bin: process.execPath,
      args: [projectEntry('svelte-language-server', 'bin/server.js'), '--stdio'],
    };
  return {
    bin: process.execPath,
    args: [projectEntry('typescript-language-server', 'lib/cli.mjs'), '--stdio'],
    initializationOptions: {
      hostInfo: 'Codex ZUI',
      disableAutomaticTypingAcquisition: true,
      // 只使用完整语义服务，避免尚未就绪的 syntax server 返回 any。
      tsserver: { path: resolve(root, 'node_modules/typescript/lib'), useSyntaxServer: 'never' },
      plugins: [{ name: 'typescript-svelte-plugin', location: root, languages: ['svelte'] }],
    },
  };
}
