import { buildStyle } from '../css/builder.js';
import type { StyleProgram } from '../css/program.js';
import { canonicalize, hashText } from '../css/serialize.js';
import { withCssEvaluation } from './evaluation.js';
import { tokenUses, type TokenUse } from '../theme/requirements.js';
import type { TokenSchema } from '../theme/types.js';
import { styleProtocol } from './protocol.js';

export interface StyleDefinition {
  readonly className: string;
  readonly source: string;
  readonly program: StyleProgram;
  readonly canonical: string;
  readonly layer?: string | null;
  readonly tokens: readonly TokenUse[];
}

// 这里只保存只读模块定义；请求主题、变量和 DOM 引用始终属于各自 runtime。
const definitions = new Map<string, { definition: StyleDefinition; references: number }>();

export function findDefinition(className: string): StyleDefinition | undefined {
  return definitions.get(className)?.definition;
}

export function retainDefinition(definition: StyleDefinition): () => void {
  let entry = definitions.get(definition.className);
  if (entry && entry.definition.canonical !== definition.canonical)
    throw new Error('Module CSS hash collision.');
  if (!entry) {
    entry = { definition, references: 0 };
    definitions.set(definition.className, entry);
  }
  entry.references++;
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    if (--entry.references === 0) definitions.delete(definition.className);
  };
}

/** @internal 编译器为模块初始化建立所有权，HMR 与消费者共同持有定义。 */
export function createStyleModule(source: string, protocol: number = styleProtocol.version) {
  styleProtocol.check(protocol);
  const owned = new Map<string, () => void>();
  let disposed = false;
  return {
    call<A extends unknown[], R>(site: string, fn: (...args: A) => R, ...args: A): R {
      if (disposed) throw new Error('Style module is disposed.');
      let slot = 0;
      return withCssEvaluation(
        () => fn(...args),
        (factory, options = {}) => {
          const { theme, layer, tokenMap } = options;
          const program = buildStyle<TokenSchema, object>(factory, theme, undefined, tokenMap);
          const position = source + ':' + site + ':' + slot++;
          const tokens = tokenUses(program);
          const canonical = JSON.stringify([
            'module',
            position,
            canonicalize(program),
            layer === undefined ? false : layer,
            tokens,
          ]);
          const className = 'z-m-' + hashText(canonical);
          if (owned.has(className)) {
            // 同一模块的快速复用也必须核对内容，不能只信任哈希相等。
            if (findDefinition(className)?.canonical !== canonical)
              throw new Error('Module CSS hash collision.');
          } else {
            const definition = Object.freeze({
              className,
              source: position,
              program,
              canonical,
              layer,
              tokens,
            });
            owned.set(className, retainDefinition(definition));
          }
          return className;
        },
      );
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const stop of owned.values()) stop();
      owned.clear();
    },
  };
}
