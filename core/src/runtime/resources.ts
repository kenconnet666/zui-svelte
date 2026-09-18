import type * as CSS from 'csstype';
import { compile, middleware, prefixer, serialize, stringify } from 'stylis';
import { buildStyle, type StyleFactory } from '../css/builder.js';
import { canonicalize, hashText, serializeProgram, serializeTheme } from '../css/serialize.js';
import { validateQuery, validateValue } from '../css/validate.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import type { RuleRecord, StyleRegistry } from './registry.js';
import { runAll } from './callbacks.js';

export interface StyleResource {
  dispose(): void;
}
export interface AnimationResource extends StyleResource {
  readonly name: string;
}
export interface PropertyRegistration {
  syntax: string;
  inherits: boolean;
  initialValue?: string | number;
}
interface RegistrationOwner {
  canonical: string;
  references: number;
}
const documentProperties = new WeakMap<Document, Map<string, Set<RegistrationOwner>>>();

export function createResources<T extends TokenSchema>(
  registry: StyleRegistry,
  theme: Theme<T>,
  options: { layer?: string; document?: Document } = {},
) {
  const properties = new Map<string, RegistrationOwner>();
  let shared = options.document && documentProperties.get(options.document);
  if (options.document && !shared) documentProperties.set(options.document, (shared = new Map()));
  function forget(name: string, owner: RegistrationOwner) {
    if (properties.get(name) !== owner) return;
    properties.delete(name);
    const owners = shared?.get(name);
    owners?.delete(owner);
    if (!owners?.size) shared?.delete(name);
  }
  function resource(record: RuleRecord, afterDispose?: () => void): StyleResource {
    let disposed = false;
    return {
      dispose() {
        if (disposed) return;
        disposed = true;
        runAll(
          [() => registry.release(record), () => afterDispose?.()],
          'Style resource cleanup failed.',
        );
      },
    };
  }
  function process(css: string): string {
    return serialize(compile(css), registry.prefix ? middleware([prefixer, stringify]) : stringify);
  }
  return {
    global(selector: string, factory: StyleFactory<T>): StyleResource {
      validateQuery(selector, true);
      if (selector.trim().startsWith('@'))
        throw new TypeError('Use the dedicated resource API for at-rules.');
      return resource(
        registry.resource(
          serializeProgram(buildStyle(factory, theme, options.layer), selector, registry.prefix),
          'global:' + selector,
        ),
      );
    },
    theme(selector: string, value: Theme<T> = theme): StyleResource {
      return resource(registry.resource(serializeTheme(value, selector), 'theme:' + selector));
    },
    keyframes(frames: Readonly<Record<string, StyleFactory<T>>>): AnimationResource {
      if (!Object.keys(frames).length) throw new TypeError('Keyframes cannot be empty.');
      const programs = Object.entries(frames).map(([stop, factory]) => {
        for (const position of stop.split(',').map((value) => value.trim())) {
          if (position === 'from' || position === 'to') continue;
          if (!/^\d+(?:\.\d+)?%$/u.test(position) || Number.parseFloat(position) > 100)
            throw new TypeError('Invalid keyframe position: ' + stop);
        }
        const program = buildStyle(factory, theme);
        if (program.some((node) => node.kind !== 'declaration' || node.important))
          throw new TypeError('Keyframes require ordinary declarations.');
        return { stop, program };
      });
      const name =
        registry.namespace +
        '-k-' +
        hashText(
          JSON.stringify(programs.map(({ stop, program }) => [stop, canonicalize(program)])),
        );
      const css = process(
        '@keyframes ' +
          name +
          '{' +
          programs.map(({ stop, program }) => serializeProgram(program, stop, false)).join('') +
          '}',
      );
      return { name, ...resource(registry.resource(css, 'keyframes')) };
    },
    fontFace(descriptors: CSS.AtRule.FontFace): StyleResource {
      const css = Object.entries(descriptors)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => {
          if (
            !/^[a-zA-Z][a-zA-Z0-9]*$/u.test(key) ||
            (typeof value !== 'string' && typeof value !== 'number') ||
            (typeof value === 'number' && !Number.isFinite(value))
          )
            throw new TypeError('Invalid font descriptor.');
          const property = key.replace(/[A-Z]/gu, (letter) => '-' + letter.toLowerCase());
          return property + ':' + validateValue(String(value)) + ';';
        })
        .join('');
      if (!descriptors.fontFamily || !descriptors.src)
        throw new TypeError('fontFamily and src are required.');
      return resource(registry.resource(process('@font-face{' + css + '}'), 'fonts'));
    },
    property(name: `--${string}`, options: PropertyRegistration): StyleResource {
      if (!/^--[a-zA-Z_][\w-]*$/u.test(name)) throw new TypeError('Invalid custom property name.');
      if (typeof options.syntax !== 'string' || typeof options.inherits !== 'boolean')
        throw new TypeError('Invalid property registration.');
      if (typeof options.initialValue === 'number' && !Number.isFinite(options.initialValue))
        throw new TypeError('Invalid property initial value.');
      if (options.syntax !== '*' && options.initialValue === undefined)
        throw new TypeError('A typed property needs an initial value.');
      const canonical = JSON.stringify([options.syntax, options.inherits, options.initialValue]);
      const existing = properties.get(name);
      if (existing && existing.canonical !== canonical)
        throw new Error('Conflicting property registration: ' + name);
      // 注册名不随 runtime namespace 隔离；同一 Document 的 ZUI 所有者必须保持定义一致。
      for (const owner of shared?.get(name) ?? [])
        if (owner.canonical !== canonical)
          throw new Error('Conflicting document property registration: ' + name);
      const css =
        '@property ' +
        name +
        '{syntax:' +
        JSON.stringify(options.syntax) +
        ';inherits:' +
        options.inherits +
        ';' +
        (options.initialValue === undefined
          ? ''
          : 'initial-value:' + validateValue(String(options.initialValue)) + ';') +
        '}';
      const record = registry.resource(css, 'property:' + name);
      const registration = existing ?? { canonical, references: 0 };
      registration.references++;
      properties.set(name, registration);
      if (shared) {
        let owners = shared.get(name);
        if (!owners) shared.set(name, (owners = new Set()));
        owners.add(registration);
      }
      return resource(record, () => {
        if (--registration.references === 0) forget(name, registration);
      });
    },
    dispose() {
      for (const [name, owner] of properties) forget(name, owner);
    },
  };
}
