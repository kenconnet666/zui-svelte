import { z } from '@zui/svelte';

// 独立安装包只依赖 ZUI，仍应得到原生 Zod 的值与输入/输出类型。
const schema = z.object({ quantity: z.string().transform(Number) });
const input: z.input<typeof schema> = { quantity: '3' };
const output: z.output<typeof schema> = schema.parse(input);

// @ts-expect-error 转换后的输出是数字，不应退化为 any 或仍保持字符串。
const invalidOutput: z.output<typeof schema> = { quantity: '3' };

void [output, invalidOutput];
