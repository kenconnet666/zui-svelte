import { config } from 'zod/v4/core';

// 在业务创建 schema 之前固定解释器模式；不按请求修改全局 locale。
// 单独导入 core 配置函数，未使用校验的消费者不必保留整套 Zod schema API。
config({ jitless: true });
export { z } from 'zod';
