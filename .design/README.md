# 设计与工程文档

当前文档只保留有效合同、验收证据和正在讨论的设计。旧草案、逐次排障与提交流水已合并或删除，原文可从 Git 历史恢复；不维护第二份历史目录。

| 入口                                         | 内容                                                                |
| -------------------------------------------- | ------------------------------------------------------------------- |
| [architecture.md](architecture.md)           | 工作区边界、依赖方向、已确认约束                                    |
| [core-contracts.md](core-contracts.md)       | core 已实现合同及关键取舍；用法以包 README 为准                     |
| [core-acceptance.md](core-acceptance.md)     | A01–A40 与完整候选 CI、产物证据                                     |
| [svelte-components.md](svelte-components.md) | 编写偏好、默认值编译、slotProps 组合、基础设施/组件目录与 A0–E 验收 |
| [svelte-phase1.md](svelte-phase1.md)         | 第一阶段架构与基础设施执行计划；待用户审阅后启动                    |
| [development.md](development.md)             | 开发命令、本地关键检查和清理规则                                    |
| [ci.md](ci.md)                               | 完整 CI、安装包和报告交付                                           |
| [dependencies.md](dependencies.md)           | 依赖职责与新增依赖准入                                              |
| [language-services.md](language-services.md) | MCP/LSP 安装、能力边界与必要排障                                    |
| [documentation.md](documentation.md)         | 普通 Svelte 文档站约定                                              |
| [core-performance.md](core-performance.md)   | 性能门槛含义和报告口径                                              |

core-api.json、core-distribution-budget.json、core-performance-budget.json 由脚本读取，分别保存 API 合同、分发/类型预算和性能基线。移动或修改时必须同步相关 scripts，不能当作普通说明文件删除。

日常使用入口：[core API](../core/README.md)、[Svelte 接入](../svelte/README.md)。新增决定直接更新所属合同，不再增加一份“最终版/新规划/剩余规划”。
