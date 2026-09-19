# 性能门槛与口径

预算是退化门槛，不是每台机器的延迟承诺。当前完整证据见 [验收台账](core-acceptance.md)，机器读取的门槛保留在 core-performance-budget.json 和 core-distribution-budget.json；失败不能自动放宽预算。

| 验收         | 输入与硬约束                                                              | 报告                   |
| ------------ | ------------------------------------------------------------------------- | ---------------------- |
| 生成         | 已安装 csstype + schema；生成类型/运行时表一致，分别报告语义映射覆盖      | css-coverage.json      |
| 类型规模     | 500 Token 精确键和未知键负例；60 秒、800000 KiB 上限                      | type-budget.json       |
| 分发         | 完整 ESM JS ≤300000 B，gzip ≤50000 B，声明 ≤800000 B；无 Node builtin     | contracts.json         |
| 最小基础主题 | baseTheme 窄入口裁剪亮暗预设，gzip ≤10000 B；不代表完整 runtime 大小      | contracts.json         |
| Node 更新    | 10000 次稳定更新、1000 实例各 100 次更新、100 轮挂载销毁                  | benchmark.json         |
| Node 保留堆  | 多批创建/销毁后强制 GC，保留增长 ≤16 MiB                                  | benchmark.json         |
| 浏览器       | 三引擎 × inline/stylesheet；1000 实例更新、100 次主题切换、100 轮挂载销毁 | browser-benchmark.json |
| DOM 分片     | 最多 64 条/片；千规则不超过 32 个节点，单条改动只重写相关片，稀疏片可合并 | core DOM 测试          |

Node 时间基线固定在预算 JSON 的 CPU/平台/Node 主版本；只有同环境才硬比较 p95，其余记录不同环境。全部环境都必须满足规则/来源/绑定/样式记录有界，稳定提升无额外编译，最终释放归零。浏览器 5000 ms / 千实例 p95 是灾难性退化上限，不是 60fps 承诺。

真实浏览器测量消费完整构建产物，强制读取计算样式；Node 内存表结果不能代替 DOM 成本。报告包含提交和环境，candidate-evidence.json 将其与实际测试的 tarball 关联。

本地只运行改动相关探针。完整类型/多浏览器/包外及预算交 CI；500 Token 的编辑器体验另由 [LSP 验收](language-services.md) 测量，不用 tsc 时长推断 IDE 补全速度。
