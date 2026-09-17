# 换机交接：core 持续实现

交接日期：2026-09-18。用户要求保存文档、推送 Git 后结束本机工作，换电脑继续。
仓库：https://github.com/kenconnet666/zui-svelte
分支：master

## 先读这里

目标仍是完成 core 并尽量生产可用，尚未完成。不要把已经绿色的基础 runtime CI 当成整个 class 编译/SSR 接入的生产验收。

当前交接保存了未完成的 C4 编译接入原型和相应验收代码。交接推送后不等待 CI，新电脑先查看该提交的 CI 结果，再继续修复。

## 新电脑启动

安装 Node.js 24 与 pnpm 11.22.0，然后：

```powershell
git clone https://github.com/kenconnet666/zui-svelte.git
cd zui-svelte
pnpm install --frozen-lockfile
pnpm dev
```

若需要安装指定 pnpm：

```powershell
npm install --global pnpm@11.22.0
```

源码、生成物、锁文件和配置都在 Git 中，无需从旧电脑复制 node_modules 或 dist。三个 workspace 直接在根目录 core、svelte、docs。

查看本次交接提交的 CI（使用完整 SHA）：

```powershell
gh auth status
$headCommit = (git rev-parse HEAD).Trim()
gh run list --repo kenconnet666/zui-svelte --workflow ci.yml --commit $headCommit --limit 3
gh run view <运行ID> --repo kenconnet666/zui-svelte --log-failed
```

本机 Git 直连 GitHub 曾失败，使用当前机器的 Windows 代理 127.0.0.1:10808 后推送成功，只用了命令级设置。新电脑应使用自己的网络配置，不要照搬这个代理端口。

## 已确认的约束

- 专注 core；svelte 与 docs 只做验证 core 的最少接入，不扩展业务组件或文档产品。
- css() 返回原始字符串，推荐模板内 class={css((s) => { ... })}。
- 不公开 css.parts、StyleHandle、panel.props 或手写 attachment/动态 getter。
- 常量初次保持静态；检测到值变化后自动提升；结构/不安全变化更新哈希规则。
- 不分析值来自哪个响应式变量；编译器负责隐藏绑定、生命周期和 SSR。
- 子元素独立绑定，多个 class 自由组合，参数优先普通 TS 函数。
- 复杂组件以 slotProps 转发子元素/子组件参数、class、style 等。
- 首版要求 SvelteKit/SSR 消费、hydration、请求隔离。
- 本地只做关键验证，优先 WebStorm；重新发现新会话工具，不假设 IDE MCP 存在。
- 完整验证交给 CI。每次推送前查看上一轮；推送后继续工作，不等待或轮询新 CI。
- 提交说明和必要的代码注释使用中文，保持简洁、可人工维护。
- 周额度至少保留 15%。交接前查询已用 39%，剩余约 61%；新电脑必须重新查询。

## 已推送且已确认 CI 成功的阶段

| 提交    | 内容                                        | 验证                                       |
| ------- | ------------------------------------------- | ------------------------------------------ |
| 6bd0b2a | 生成式 CSS、主题、builder                   | 当时 CI 发现两处类型问题，已由后续提交修复 |
| 7fb15be | runtime、自动提升、类型修复                 | CI 35235308799 成功                        |
| dcfa4b4 | 嵌套主题、SSR 接管、core 三浏览器测试       | CI 35236622296 成功                        |
| 501fa9b | 全局样式、keyframes、字体、@property 与回收 | CI 35238179716 成功                        |

最近已确认的绿色运行：
https://github.com/kenconnet666/zui-svelte/actions/runs/35238179716

## 已有 core 能力

- scripts/generate-css.mjs 从固定版本 csstype 与 schema.ts 生成 857 个属性、262 组关键字。
- 生成类型和运行时表共用数据；生成物已提交，不能手工修改。
- 语句式 builder：属性调用、关键字、Token、单位、选择器、媒体/容器/supports 条件、important、自定义属性与显式 raw 属性。
- 有序 StyleProgram 与 Stylis 序列化，保留声明顺序和重复回退。
- defineTheme、extendTheme、overrideTheme、明暗预设、ThemeScope、DOM 主题绑定。
- MemoryStyleSheet、BrowserStyleSheet、StyleRegistry、引用与来源位置回收。
- StyleBinding 默认静态、变化后提升，复杂目标/不安全值走完整规则，历史有界。
- 独立变量命名避免多个实例或多个 class 串值。
- SSR style 标签、nonce、样式接管、ShadowRoot。
- 全局样式、主题样式、keyframes、font-face、@property 的显式资源生命周期。

## 本次交接新增的 C4 原型

这些代码已有局部验证，但完整链路以交接 CI 为准：

- core/src/runtime/classes.ts：css() 字符串入口、ClassController、普通 class 规范化与组合。
- registry 新增 class 查找、变量元数据及订阅，保证 class 字符串不变时仍通知变量更新。
- svelte/src/compiler/preprocess.ts：Vite 插件/预处理器，把 class/属性消费点改写为隐藏绑定；支持导入别名、Each/KeyBlock 身份；复用已有 $props.id。
- svelte/src/runtime/context.ts、scope.ts：Svelte 生命周期与 createSubscriber 接入。
- svelte/src/server.ts：renderStyled 与 SvelteKit handle 的收集原型。
- svelte/tests/compiler.test.ts：编译语法测试。
- svelte/tests/ssr.test.ts：通过 Vite SSR 实际加载并渲染 fixture，交给 CI。
- svelte/tests/fixtures：CoreProbe 与 SlotProbe，仅为验证。
- docs 的隐藏路径 /#/__core-test：测试 class、slotProps、列表和 snippet。
- docs/tests/core.spec.ts：三浏览器实际渲染验收，交给 CI。

本地已通过：ClassController 4 项关键测试；编译器 4 项语法测试；前一版 scope/server 文件的小范围类型确认。新 SSR/浏览器验收没有在本地完整执行。

## 新电脑优先事项

1. 查看交接提交 CI，先修复真实失败。重点关注类型检查、SSR 测试和新增浏览器验收。
2. 核实 class 编译桥真正工作：直接模板、普通 TS helper、多个 class、slotProps、keyed 重排、卸载清理。
3. 验证 SSR/hydration 两端命名与请求隔离；当前仅加入 SSR 测试，尚未建立真实 SvelteKit 应用 fixture。
4. 审查 compiler 对普通属性、事件、spread、style: 指令的求值顺序与类型/诊断影响，不能因为重写而改变语义。
5. 审查 createSubscriber 与 context 默认 runtime 的释放顺序，包括片段/异步模板和跨组件生命周期。
6. 完善主题类型、别名/派生、主题切换与包外消费；不要把设计文档中的候选 API 当成已经实现。
7. 首版生产完成前按 design/core*.md 做逐条能力审计，补真实验收；不得用现有少量 fixture 证明全部能力。

## 已知边界与未验证点

- Snippet/await 内暂用完整规则快照，避免把一次源码位置的多个渲染实例混用；这不是已完成的自动提升优化。
- 未集成的第三方组件边界采用保守处理，不能声称所有任意字符串传递都能自动写变量。
- 当前每个规则组使用 style 节点，性能和大规模场景需要进一步审计。
- 严格 CSP、SSR streaming、复杂层叠、特殊属性回退等仍需完整验收。
- recipe 等设计内容尚未全部落地；当前优先普通 TS 函数复用。
- 两个库仍 private，未发布 npm；没有部署公网文档站。
- 原型不能称作已经完成的生产版本。

## 常用命令（按范围使用）

| 命令                                                                | 用途                                  |
| ------------------------------------------------------------------- | ------------------------------------- |
| pnpm generate                                                       | 更新生成类型与运行时表                |
| pnpm generate:check                                                 | 检查生成物一致性                      |
| pnpm --filter @zui/core exec vitest run src/runtime/classes.test.ts | 局部 class 合同验证                   |
| pnpm --filter @zui/svelte exec vitest run tests/compiler.test.ts    | 局部编译验证                          |
| pnpm run check / lint / build                                       | 完整检查，默认交给 CI                 |
| pnpm test:core                                                      | core 完整 Node 测试，默认 CI          |
| pnpm test:core:browser                                              | core 三浏览器验收，默认 CI            |
| pnpm test                                                           | Docs 与 class 接入浏览器验收，默认 CI |

所有路径以本次检出的实际代码为准。继续前先检查 git status，保留任何新电脑上的已有修改。
