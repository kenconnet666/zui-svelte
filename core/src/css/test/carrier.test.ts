import { expect, it } from 'vitest';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';

it('offers native and theme literal completions while accepting arbitrary CSS strings', () => {
  // 虚拟消费文件直接引用真实载体类型，防止“类型通过但没有补全”的回归。
  const file = fileURLToPath(new URL('../__completion_probe__.ts', import.meta.url)).replaceAll(
    '\\',
    '/',
  );
  const source = `import type { Carrier } from './carrier.js';
declare const value: Carrier<'inlineSize', 'auto', 'length', 1, 'size', { size: { panel: '36rem' } }>;
value('calc(100% - 2rem)');
value(null);
value(undefined);
value('');`;
  const options: ts.CompilerOptions = {
    strict: true,
    skipLibCheck: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ESNext,
  };
  const service = ts.createLanguageService({
    ...ts.sys,
    getScriptFileNames: () => [file],
    getScriptVersion: () => '1',
    getScriptSnapshot(path) {
      const text = path === file ? source : ts.sys.readFile(path);
      return text === undefined ? undefined : ts.ScriptSnapshot.fromString(text);
    },
    getCompilationSettings: () => options,
    getDefaultLibFileName: ts.getDefaultLibFilePath,
  });
  try {
    expect(service.getSemanticDiagnostics(file)).toEqual([]);
    const result = service.getCompletionsAtPosition(file, source.lastIndexOf("'"), {});
    expect(result?.entries.map((entry) => entry.name)).toEqual(
      expect.arrayContaining(['auto', 'max-content', '_panel']),
    );
  } finally {
    service.dispose();
  }
});
