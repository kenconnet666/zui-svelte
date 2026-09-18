import { StyleError } from './errors.js';
// 只校验声明边界，不尝试用不完整的正则重写浏览器的 CSS 值语法。
export function validateValue(value: string): string {
  let quote = '';
  let escaped = false;
  const stack: string[] = [];
  for (let i = 0; i < value.length; i++) {
    const c = value[i]!;
    if (escaped) {
      escaped = false;
      continue;
    }
    if (c === '\\') {
      escaped = true;
      continue;
    }
    if (quote) {
      // CSS 字符串不能包含未转义换行，否则浏览器会提前终止字符串边界。
      if (c === '\n' || c === '\r' || c === '\f')
        throw new StyleError('css.value', 'Unescaped newline in CSS string.');
      if (c === quote) quote = '';
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      continue;
    }
    if (c === '/' && value[i + 1] === '*')
      throw new StyleError('css.value', 'CSS comments are not declaration values.');
    if (c === '(' || c === '[') stack.push(c);
    else if (c === ')' || c === ']') {
      if (stack.pop() !== (c === ')' ? '(' : '['))
        throw new StyleError('css.value', 'Unbalanced CSS value.');
    } else if (c === '{' || c === '}' || (c === ';' && stack.length === 0)) {
      throw new StyleError('css.value', 'A CSS value cannot contain another declaration.');
    }
  }
  if (quote || stack.length || escaped || /!\s*important\s*$/iu.test(value)) {
    throw new StyleError('css.value', 'Invalid CSS value; use _important for priority.');
  }
  if (!value.trim()) throw new StyleError('css.value', 'CSS value cannot be empty.');
  return value;
}

export function validateQuery(query: string, atRule = false): string {
  validateValue(query);
  if (atRule) return query;
  let quote = '';
  let escaped = false;
  let depth = 0;
  let anchored = false;
  const requireAnchor = () => {
    if (!anchored)
      throw new StyleError(
        'css.selector',
        'Each local selector branch needs & outside functions and attributes.',
      );
  };
  // 字符串、属性和函数里的 & 不能证明分支被当前根约束，如 :not(&) 或 :is(&, body)。
  for (const c of query) {
    if (escaped) {
      escaped = false;
      continue;
    }
    if (c === '\\') {
      escaped = true;
      continue;
    }
    if (quote) {
      if (c === quote) quote = '';
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      continue;
    }
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    else if (depth === 0) {
      if (c === '&') anchored = true;
      else if (c === ',') {
        requireAnchor();
        anchored = false;
      }
    }
  }
  requireAnchor();
  return query;
}

export function escapeStyleText(css: string): string {
  return css.replace(/<\/style/giu, '<\\/style');
}
