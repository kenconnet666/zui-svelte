import { StyleError } from '../css/errors.js';
import type { StyleProgram } from '../css/program.js';
import type { Theme, TokenSchema } from './types.js';
import { matchesTokenKind } from './types.js';

export interface TokenUse {
  readonly namespace: string;
  readonly category: string;
  readonly token: string;
  readonly kind: 'string' | 'number';
}

// 元数据随程序回收，不解析任意 CSS 字符串，也不把请求状态写进共享定义。
const requirements = new WeakMap<StyleProgram, readonly TokenUse[]>();
const empty: readonly TokenUse[] = Object.freeze([]);

export function setTokenUses(program: StyleProgram, uses: readonly TokenUse[]): void {
  if (uses.length) requirements.set(program, Object.freeze([...uses]));
}

export function tokenUses(program: StyleProgram): readonly TokenUse[] {
  return requirements.get(program) ?? empty;
}

export function assertTokenUses(uses: readonly TokenUse[], theme: Theme<TokenSchema>): void {
  for (const use of uses) {
    if (use.namespace !== theme.namespace)
      throw new StyleError(
        'theme.namespace',
        'Theme namespace mismatch: ' + use.namespace + ' / ' + theme.namespace,
      );
    if (!Object.hasOwn(theme.resolved[use.category] ?? {}, use.token))
      throw new StyleError('theme.token', 'Missing theme token: ' + use.category + '.' + use.token);
    if (!matchesTokenKind(use.category, theme.resolved[use.category]![use.token], use.kind))
      throw new StyleError(
        'theme.token',
        'Incompatible theme token: ' + use.category + '.' + use.token,
      );
  }
}
