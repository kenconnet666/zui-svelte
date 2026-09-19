export function graphemes(text: string, locale: string): string[] {
  return Array.from(
    new Intl.Segmenter(locale, { granularity: 'grapheme' }).segment(text),
    (part) => part.segment,
  );
}

export type NumberDraft =
  { state: 'empty' | 'incomplete' | 'invalid' } | { state: 'valid'; canonical: string };

/** 编辑态只接收数值，不猜货币/百分比/分组；返回十进制文本，Decimal 不经过 Number。 */
export function numberDraftParser(locale: string): (text: string) => NumberDraft {
  const format = new Intl.NumberFormat(locale, { useGrouping: false });
  const digits = Array.from({ length: 10 }, (_, value) => format.format(value));
  const parts = format.formatToParts(-1.1);
  const decimal = parts.find((part) => part.type === 'decimal')!.value;
  const minus = parts.find((part) => part.type === 'minusSign')!.value;
  return (text) => {
    if (!text.trim()) return { state: 'empty' };
    let canonical = text.trim().replace(/[\u061c\u200e\u200f]/gu, '');
    for (const [value, digit] of digits.entries())
      canonical = canonical.replaceAll(digit, String(value));
    canonical = canonical.replaceAll(decimal, '.').replaceAll(minus, '-');
    if (/^[+-]?(?:\d+\.)?$/u.test(canonical) || /^[+-]?\.$/u.test(canonical))
      return { state: 'incomplete' };
    if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(canonical)) return { state: 'invalid' };
    return { state: 'valid', canonical };
  };
}
