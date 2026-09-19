import { ConfigProvider } from '../src/index.js';

type Example = { Control: { size?: 'sm' | 'md'; block?: boolean } };

function checkConfigurationTypes() {
  ConfigProvider<Example>(null as never, { components: { Control: { size: 'sm', block: false } } });
  // @ts-expect-error 配置类型来自组件 Props，不允许错误档位。
  ConfigProvider<Example>(null as never, { components: { Control: { size: 'huge' } } });
  // @ts-expect-error 不允许未登记组件键。
  ConfigProvider<Example>(null as never, { components: { Unknown: {} } });
  // @ts-expect-error 默认清单暂未发布视觉组件，不能通过泛型推导绕过清单。
  ConfigProvider(null as never, { components: { Control: {} } });
}

void checkConfigurationTypes;
