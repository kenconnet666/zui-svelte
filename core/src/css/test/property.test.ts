import { expect, it } from 'vitest';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';

it('offers native and theme literal completions while accepting arbitrary CSS strings', () => {
  // 虚拟消费文件直接引用真实载体类型，防止“类型通过但没有补全”的回归。
  const file = fileURLToPath(new URL('../__completion_probe__.ts', import.meta.url)).replaceAll(
    '\\',
    '/',
  );
  const source = `import type { StyleProperties } from './properties.generated.js';
declare const value: StyleProperties<{size:{panel:string}}>['inlineSize'];
value.raw('calc(100% - 2rem)');
value.raw(null);
value.raw(undefined);
value.raw('_missing');
value.raw('');
value.token('auto');
value.token('_panel');
// @ts-expect-error 属性对象不可调用
value('auto');
// @ts-expect-error 严格入口拒绝未知主题键
value.token('_missing');
// @ts-expect-error 严格入口拒绝任意 CSS
value.token('calc(100% - 2rem)');
// @ts-expect-error 操作返回 void，不能继续样式链
value.raw('auto').px(1);`;
  const options: ts.CompilerOptions = {
    strict: true,
    skipLibCheck: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ESNext,
  };
  const service = ts.createLanguageService({
    ...ts.sys,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
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
    const position = source.indexOf("raw('');") + 5;
    const result = service.getCompletionsAtPosition(file, position, {});
    expect(result?.entries.map((entry) => entry.name)).toEqual(
      expect.arrayContaining(['auto', 'max-content', '_panel']),
    );
    const strict = service.getCompletionsAtPosition(file, source.indexOf("token('auto')") + 7, {});
    expect(strict?.entries.map((entry) => entry.name)).toEqual(
      expect.arrayContaining(['auto', '_panel']),
    );
    const members = service.getCompletionsAtPosition(file, source.indexOf('value.raw') + 6, {});
    expect(members?.entries.map((entry) => entry.name)).not.toContain('call');
    expect(members?.entries.map((entry) => entry.name)).toEqual(
      expect.arrayContaining(['token', 'raw', 'px', '_panel']),
    );
  } finally {
    service.dispose();
  }
});
