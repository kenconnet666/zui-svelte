import type { Declaration, StyleProgram } from '../css/program.js';
import { visitDeclarations } from '../css/program.js';

// 仅优化能确认语义的独立长写声明；其余值仍以完整规则更新，功能不降级。
const properties = new Set(
  'width height min-width max-width min-height max-height inline-size block-size min-inline-size max-inline-size min-block-size max-block-size top right bottom left inset-inline-start inset-inline-end inset-block-start inset-block-end opacity color background-color border-top-color border-right-color border-bottom-color border-left-color outline-color fill stroke font-size font-weight line-height letter-spacing word-spacing margin-top margin-right margin-bottom margin-left margin-inline-start margin-inline-end margin-block-start margin-block-end padding-top padding-right padding-bottom padding-left padding-inline-start padding-inline-end padding-block-start padding-block-end row-gap column-gap z-index transform'.split(
    ' ',
  ),
);
const wideKeywords = new Set(['inherit', 'initial', 'unset', 'revert', 'revert-layer']);
const selfSelector =
  /^&(?::(?:hover|active|focus|focus-visible|focus-within|disabled|enabled|checked|invalid|valid|first-child|last-child)|::(?:before|after|placeholder|marker))*$/u;
const scalar = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|r?em|%|vh|vw|ch|ex)?$/u;
const color = /^(?:#[\da-f]{3,8}|transparent|currentColor|black|white|red|green|blue)$/iu;

export function structureOf(program: StyleProgram): string {
  return JSON.stringify(program, (key, value) => (key === 'value' ? null : value));
}

export function declarationsOf(
  program: StyleProgram,
): { declaration: Declaration; path: readonly string[] }[] {
  const declarations: { declaration: Declaration; path: readonly string[] }[] = [];
  visitDeclarations(program, (declaration, _index, path) =>
    declarations.push({ declaration, path }),
  );
  return declarations;
}

export function canPromote(
  declaration: Declaration,
  path: readonly string[],
  supports?: (property: string, value: string) => boolean,
): boolean {
  if (
    !properties.has(declaration.property) ||
    wideKeywords.has(declaration.value) ||
    /\b(?:var|env|attr)\s*\(/iu.test(declaration.value)
  )
    return false;
  if (
    path.some((query) =>
      query.startsWith('@')
        ? !/^@(media|supports|container)\s/u.test(query)
        : !selfSelector.test(query),
    )
  )
    return false;
  if (supports) return supports(declaration.property, declaration.value);
  return scalar.test(declaration.value) || color.test(declaration.value);
}
