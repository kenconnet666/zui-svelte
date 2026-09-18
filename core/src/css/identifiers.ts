/** 连分隔符也编码，避免不同路径拼接成相同变量名。 */
export function encodeSegment(value: string): string {
  return [...value]
    .map((c) => (/[a-zA-Z0-9]/u.test(c) ? c : '_' + c.codePointAt(0)!.toString(16) + '_'))
    .join('');
}
