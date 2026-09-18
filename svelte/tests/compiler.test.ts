import { describe, expect, it } from 'vitest';
import { compile } from 'svelte/compiler';
import { transformClasses } from '../src/compiler/preprocess.js';
import { createStyleScope } from '../src/runtime/scope.js';
import { styleProtocol } from '@zui/core';
import { SourceMap } from 'node:module';

describe('class compiler', () => {
  it('preserves legacy component mode and exported props without injecting runes', () => {
    const source =
      '<script>import {css} from "@zui/core";export let width=100;</script><div class={css(s=>{s.width.px(width);})}/>';
    const result = transformClasses(source, '/app/Legacy.svelte')!;
    expect(result.code).not.toContain('$props.id');
    expect(
      compile(result.code, { filename: 'Legacy.svelte', generate: 'client' }).metadata.runes,
    ).toBe(false);
    expect(() =>
      compile(result.code, { filename: 'Legacy.svelte', generate: 'server' }),
    ).not.toThrow();
    expect(transformClasses(result.code, '/app/Legacy.svelte')).toBeUndefined();
  });
  it('does not treat ordinary marker text or comments as compiled code', () => {
    for (const text of ['<p>zui-class-compiled</p>', '<!-- zui-class-compiled -->']) {
      const source =
        '<script>import {css} from "@zui/core";</script>' +
        text +
        '<div class={css(s=>{s.width.px(10);})}/>';
      const result = transformClasses(source, '/app/Marker.svelte')!;
      expect(result).toBeDefined();
      expect(transformClasses(result.code, '/app/Marker.svelte')).toBeUndefined();
    }
  });
  it('validates the protocol before skipping already compiled components', () => {
    const result = transformClasses('<div class={"panel"}/>', '/app/Protocol.svelte')!;
    const incompatible = result.code.replace(
      ', ' + styleProtocol.version + ', false);',
      ', 0, false);',
    );
    expect(() => transformClasses(incompatible, '/app/Protocol.svelte')).toThrow(
      'protocol mismatch',
    );
  });
  it('preserves expression source locations across attributes and directives', () => {
    const source = `<script lang="ts">
import {css} from '@zui/core';
let width=$state(10); let node; let props={title:'panel'};
</script>
<div id="panel" bind:this={node} {...props}
 class={css(s=>{
  s.width.px(width);
 })} style:color="red" title="width {width}"/>`;
    const result = transformClasses(source, '/app/Mapped.svelte')!;
    function locate(text: string, needle: string): [number, number] {
      const offset = text.lastIndexOf(needle);
      expect(offset).toBeGreaterThanOrEqual(0);
      const before = text.slice(0, offset);
      return [before.split('\n').length - 1, offset - before.lastIndexOf('\n') - 1];
    }
    const map = new SourceMap(JSON.parse(result.map.toString()));
    for (const needle of ['s.width.px(width)', 'props', 'width']) {
      // 表达式在属性合并后仍映射到它自身，不是 class/spread 起点。
      const entry = map.findEntry(...locate(result.code, needle));
      const expected = locate(source, needle);
      expect(entry).toMatchObject({ originalLine: expected[0], originalColumn: expected[1] });
    }
    for (const generate of ['client', 'server'] as const)
      expect(() => compile(result.code, { filename: 'Mapped.svelte', generate })).not.toThrow();
  });
  it('keeps runes in declaration position and wraps imported helper producers', () => {
    const source = `<script lang="ts">
import {make} from './helper';
const plain=make(10);
let width=$state(20);
const computed=$derived(make(width));
const callback=$derived.by(()=>make(width));
const id=$props.id();
</script><div class={[plain,computed,callback]}>{id}</div>`;
    const result = transformClasses(source, '/app/Helpers.svelte')!;
    expect(result.code).toContain('$derived(__zuiScope.snapshot');
    expect(result.code).toContain('$derived.by(__zuiScope.wrapSnapshot');
    expect(result.code.match(/\$props\.id\(\)/gu)).toHaveLength(1);
    for (const generate of ['client', 'server'] as const)
      expect(() => compile(result.code, { filename: 'Helpers.svelte', generate })).not.toThrow();
  });
  it('rejects a compiler/runtime protocol mismatch before accessing component lifecycle', () => {
    expect(() => createStyleScope(() => 'owner', 'module', styleProtocol.version + 1)).toThrow(
      'protocol mismatch',
    );
  });
  it('registers module script constants even without an instance script or styled element', () => {
    for (const template of [
      '',
      '<script>let value=1;</script><p>{value}</p>',
      '<div class={panel}>module</div>',
    ]) {
      const source =
        '<script module lang="ts">import {css} from "@zui/core"; export const panel=css(s=>{s.width.px(193);});</script>' +
        template;
      const result = transformClasses(source, '/app/Module.svelte')!;
      expect(result.code).toContain('createStyleModule');
      expect(result.map.sourcesContent).toEqual([source]);
      for (const generate of ['client', 'server'] as const)
        expect(() => compile(result.code, { filename: 'Module.svelte', generate })).not.toThrow();
      expect(transformClasses(result.code, '/app/Module.svelte')).toBeUndefined();
    }
  });
  it('reuses an existing props id and does not use each keys in the fallback branch', () => {
    const source =
      '<script>const id=$props.id();let rows=[];</script>{#each rows as row (row.id)}<div class={row.class}/>{:else}<div class={"empty"}/>{/each}';
    const result = transformClasses(source, '/app/Existing.svelte')!;
    expect(result.code.match(/\$props\.id\(\)/gu)).toHaveLength(1);
    expect(result.code).toContain('[row.id]');
    expect(result.code.slice(result.code.indexOf('{:else}'))).not.toContain('row.id');
    expect(() => compile(result.code, { filename: 'Existing.svelte' })).not.toThrow();
  });
  it('compiles native inline CSS for client and server with a source map', () => {
    const source =
      '<script lang="ts">import { css } from "@zui/core"; let width = $state(100);</script><button onclick={() => width++} class={css((s) => {s.width.px(width);s.gap.px(12);})}>test</button>';
    const result = transformClasses(source, '/app/Test.svelte', { root: '/app' })!;
    expect(result.code).toContain('__zuiScope.attrs');
    expect(result.map.sourcesContent).toEqual([source]);
    for (const generate of ['client', 'server'] as const)
      expect(() => compile(result.code, { generate, filename: 'Test.svelte' })).not.toThrow();
    expect(transformClasses(result.code, '/app/Test.svelte')).toBeUndefined();
  });
  it('keeps stable identities for keyed and unkeyed iterations', () => {
    const source =
      '<script>let rows=[];</script>{#each rows as row (row.id)}<div class={row.class}/>{/each}{#each rows as row}<div {...row.props}/>{/each}';
    const result = transformClasses(source, '/app/List.svelte')!;
    expect(result.code).toContain('[row.id]');
    expect(result.code).toContain('__zuiIndex');
    expect(() => compile(result.code, { filename: 'List.svelte' })).not.toThrow();
  });
  it('preserves ordinary TS helpers and component slotProps', () => {
    const source =
      '<script lang="ts">import {css as styles} from "@zui/core"; import Child from "./Child.svelte"; function make(n:number){return styles((s)=>{s.width.px(n);});}</script><Child class={make(20)} slotProps={{input:{class:make(10)}}}/>';
    const result = transformClasses(source, '/app/Parent.svelte')!;
    expect(result.code).toContain('const styles = __zuiScope.wrapCss(__zuiOriginal0)');
    expect(result.code).toContain('__zuiScope.component');
    expect(() =>
      compile(result.code, { generate: 'server', filename: 'Parent.svelte' }),
    ).not.toThrow();
  });
});
