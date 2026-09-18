import { StyleError } from './errors.js';
const reserved = new Set(['initial', 'inherit', 'unset', 'revert', 'revert-layer', 'default']);

export function validateLayer(name: string): string {
  if (
    typeof name !== 'string' ||
    !/^-?[_a-zA-Z][\w-]*(?:\.-?[_a-zA-Z][\w-]*)*$/u.test(name) ||
    name.split('.').some((part) => reserved.has(part.toLowerCase()))
  )
    throw new StyleError('css.layer', 'Invalid CSS layer: ' + name);
  return name;
}

export function layerProgram(program: StyleProgram, layer?: string): StyleProgram {
  if (layer !== undefined) validateLayer(layer);
  return layer && program.length
    ? Object.freeze([{ kind: 'rule', query: '@layer ' + layer, children: program }])
    : program;
}
import type { StyleProgram } from './program.js';
