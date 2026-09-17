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
      if (c === quote) quote = '';
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      continue;
    }
    if (c === '/' && value[i + 1] === '*')
      throw new TypeError('CSS comments are not declaration values.');
    if (c === '(' || c === '[') stack.push(c);
    else if (c === ')' || c === ']') {
      if (stack.pop() !== (c === ')' ? '(' : '[')) throw new TypeError('Unbalanced CSS value.');
    } else if (c === '{' || c === '}' || (c === ';' && stack.length === 0)) {
      throw new TypeError('A CSS value cannot contain another declaration.');
    }
  }
  if (quote || stack.length || escaped || /!\s*important\s*$/iu.test(value)) {
    throw new TypeError('Invalid CSS value; use _important for priority.');
  }
  if (!value.trim()) throw new TypeError('CSS value cannot be empty.');
  return value;
}

export function validateQuery(query: string, atRule = false): string {
  validateValue(query);
  if (!atRule && !query.includes('&')) throw new TypeError('A local selector must contain &.');
  return query;
}

export function escapeStyleText(css: string): string {
  return css.replace(/<\/style/giu, '<\\/style');
}
