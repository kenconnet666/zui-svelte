import { describe, expect, it } from 'vitest';
import ts from 'typescript';
import { transformStyleModule } from '../src/compiler/module.js';

describe('module style compilation', () => {
  it('wraps module snapshots while preserving typed entries, await and ordinary helpers', () => {
    const source = `import { css as base, createCss } from '@zui/core';
const css = createCss(theme);
export const panel = css((s) => { s.color._brand; });
export const awaited = base(await factory());
export function helper(width: number) { return base((s) => { s.width.px(width); }); }`;
    const result = transformStyleModule(source, '/app/panel.ts', '/app')!;
    expect(result.code).toContain(', () => (css((s)');
    expect(result.code).toContain(', base,await factory()');
    expect(result.code).toContain('return base((s)');
    expect(result.code).toContain('import.meta.hot.dispose');
    const compiled = ts.transpileModule(result.code, {
      compilerOptions: { target: ts.ScriptTarget.ESNext },
      reportDiagnostics: true,
    });
    expect(compiled.diagnostics).toEqual([]);
    expect(result.map.sourcesContent).toEqual([source]);
  });

  it('captures local helpers, map callbacks and namespace entries without rewriting function bodies', () => {
    const source = `import * as z from '@zui/core';
function inner(width: number) { return z.css(s => { s.width.px(width); }); }
const outer = (width: number) => inner(width);
export const panels = [101, 102].map(outer);
export const nested = [1].map(() => z.css(s => { s.height.px(20); }));`;
    const result = transformStyleModule(source, '/app/helpers.ts', '/app')!;
    expect(result.code).toContain('() => ([101, 102].map(outer))');
    expect(result.code).toContain('const outer = (width: number) => inner(width)');
    expect(result.code).toContain('return z.css(s =>');
    expect(ts.transpileModule(result.code, { reportDiagnostics: true }).diagnostics).toEqual([]);
  });

  it('does not alter unrelated functions or modules without module-level style calls', () => {
    expect(
      transformStyleModule('function css(){}; const value = css();', '/app/x.ts', '/app'),
    ).toBeUndefined();
    expect(
      transformStyleModule(
        "import {css} from '@zui/core'; export const helper=()=>css(()=>{});",
        '/app/x.ts',
        '/app',
      ),
    ).toBeUndefined();
  });
});
