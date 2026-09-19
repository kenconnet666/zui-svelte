import { describe, expect, it } from 'vitest';
import { compile, preprocess } from 'svelte/compiler';
import { SourceMap } from 'node:module';
import { componentPreprocess, generateComponentTypes, transformComponent } from '../components.js';
import { classPreprocess } from '../preprocess.js';

const filename = '/application/Control.svelte';
const options = {
  root: '/application',
  components: [{ file: 'Control.svelte', name: 'Control', defaults: ['size', 'block'] }],
};
const source = `<script lang="ts">
import type { HTMLButtonAttributes } from 'svelte/elements';
import { css } from '@zui/svelte';
const __zuiConfig = 'author';
let { size = 'md', block = false, class: className, style = '', slotProps = {}, children, ...rest }:
 HTMLButtonAttributes & { size?: 'sm' | 'md'; block?: boolean; slotProps?: { content?: {class?: string} } } = $props();
</script>
<button {...rest} {style} data-size={size} data-block={block} class={[css(s=>{s.width.px(12);}), className]}>
 <span {...slotProps.content} class={css(s=>{s.display.inlineFlex;})}>{@render children?.()}</span>
</button>`;

describe('component authoring compiler', () => {
  it('keeps inline types and source defaults while composing both compilation passes', async () => {
    const result = await preprocess(
      source,
      [componentPreprocess(options), classPreprocess(options)],
      { filename },
    );
    for (const generate of ['client', 'server'] as const)
      expect(() => compile(result.code, { filename, generate })).not.toThrow();
    expect(result.code).toContain('const __zuiConfig0');
    expect(result.code).toContain('.value("size", () => (');
    expect(result.code).toContain('__zuiMergeProps');
    expect(result.code).toContain('$derived(');
    const second = await preprocess(
      result.code,
      [componentPreprocess(options), classPreprocess(options)],
      { filename },
    );
    expect(second.code).toBe(result.code);
  });

  it('does not compile unrelated files or trust marker comments', () => {
    expect(transformComponent(source, '/other/Control.svelte', options)).toBeUndefined();
    expect(
      transformComponent('<!-- zui-config-compiled -->' + source, filename, options),
    ).toBeDefined();
    const result = transformComponent(source, filename, options)!;
    expect(() =>
      transformComponent(
        result.code.replace('["size","block"], 1)', '["size","block"], 9)'),
        filename,
        options,
      ),
    ).toThrow('protocol');
  });

  it('rejects accidental state/event configuration and missing or bindable defaults', () => {
    for (const key of ['value', 'open', 'checked', 'onclick'])
      expect(() =>
        transformComponent(source, filename, {
          ...options,
          components: [{ file: 'Control.svelte', name: 'Control', defaults: [key] }],
        }),
      ).toThrow();
    expect(() =>
      transformComponent(source.replace("size = 'md'", 'size'), filename, options),
    ).toThrow('explicit source default');
    expect(() =>
      transformComponent(
        source.replace("size = 'md'", "size = $bindable('md')"),
        filename,
        options,
      ),
    ).toThrow('Bindable');
    expect(() =>
      transformComponent(source, filename, {
        ...options,
        components: [...options.components, ...options.components],
      }),
    ).toThrow('duplicate');
  });

  it('retains an original source location for the default expression', () => {
    const result = transformComponent(source, filename, options)!;
    const generated = result.code.indexOf("'md'");
    const before = result.code.slice(0, generated).split('\n');
    const map = new SourceMap({
      ...result.map,
      file: filename,
      sourceRoot: '',
      sourcesContent: result.map.sourcesContent?.map((value) => value ?? '') ?? [],
    });
    const original = map.findEntry(before.length - 1, before.at(-1)!.length);
    expect(original).toMatchObject({
      originalLine: 4,
      originalColumn: source.split('\n')[4]!.indexOf("'md'"),
    });
  });

  it('generates normal ComponentProps and Pick declarations without copying fields', () => {
    const code = generateComponentTypes(options.components);
    expect(code).toContain('ComponentProps<typeof C0>');
    expect(code).toContain('"size" | "block"');
    expect(code).not.toContain('size?:');
  });
});
