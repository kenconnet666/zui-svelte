import { Decimal, z } from '@zui/svelte';

// 独立安装包只依赖 ZUI，仍应得到原生 Zod 的值与输入/输出类型。
const schema = z.object({ quantity: z.string().transform(Number) });
const input: z.input<typeof schema> = { quantity: '3' };
const output: z.output<typeof schema> = schema.parse(input);

// @ts-expect-error 转换后的输出是数字，不应退化为 any 或仍保持字符串。
const invalidOutput: z.output<typeof schema> = { quantity: '3' };

void [output, invalidOutput];

// Decimal 构造器、实例与命名空间类型也从同一业务入口取得。
const decimalSchema = z.custom<Decimal>((value) => Decimal.isDecimal(value) && value.isFinite());
const amount: z.output<typeof decimalSchema> = decimalSchema.parse(new Decimal('0.1'));
const sum: Decimal = amount.plus('0.2');
const rounding: Decimal.Rounding = Decimal.ROUND_HALF_UP;

// @ts-expect-error 领域值不能退化为任意字符串。
const invalidAmount: z.output<typeof decimalSchema> = '0.3';

void [sum, rounding, invalidAmount];
