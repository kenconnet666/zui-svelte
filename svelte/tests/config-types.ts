import { ConfigProvider } from '../src/index.js';

type Example = { Control: { size?: 'sm' | 'md'; block?: boolean } };

function checkConfigurationTypes() {
  ConfigProvider<Example>(null as never, { components: { Control: { size: 'sm', block: false } } });
  // @ts-expect-error 配置类型来自组件 Props，不允许错误档位。
  ConfigProvider<Example>(null as never, { components: { Control: { size: 'huge' } } });
  // @ts-expect-error 不允许未登记组件键。
  ConfigProvider<Example>(null as never, { components: { Unknown: {} } });
  // @ts-expect-error 未显式指定泛型时只接受生成清单，不能从配置对象推导未知组件。
  ConfigProvider(null as never, { components: { Control: {} } });
  ConfigProvider(null as never, {
    components: { Stack: { gap: 'lg', wrap: true }, Container: { maxWidth: 'full' } },
  });
  // @ts-expect-error 布局间距没有 full，不能混用其他尺度。
  ConfigProvider(null as never, { components: { Stack: { gap: 'full' } } });
}

void checkConfigurationTypes;
