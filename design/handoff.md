# 换机交接：core 首版继续收口

更新：2026-09-18。用户要求尽快收敛、推送远程，换电脑继续；本机停止新增功能。仓库 https://github.com/kenconnet666/zui-svelte，分支 master。core 尚未生产验收完成，不将阶段通过误写为整体完成。

## 新电脑先做什么

2026-09-18 新电脑接续核对：本地已同步 `b543cc9`。其 CI [35327943579](https://github.com/kenconnet666/zui-svelte/actions/runs/35327943579) 通过格式、类型、生成一致性、单元测试和构建，停在 Docs 导航测试：断言仍查找 `var(--z-panel-width)`，实际示例已为 `s.width.px(width)`。本次同步该断言，推送后不等待 CI；后续浏览器、Kit 与包外门槛仍须由新一轮完整结果确认。

本机已完成 `pnpm install --frozen-lockfile`、语言服务安装和独立 MCP 客户端验收，并注册 `zui_lsp`、官方 `svelte`、`webstorm`。等待用户重启 Codex 后检查原生工具加载；这次安装状态不沿用旧电脑的重启验收结论。下面两项 R2 缺陷及 R3–R5 仍待继续。

```powershell
git clone https://github.com/kenconnet666/zui-svelte.git
Set-Location zui-svelte
pnpm install --frozen-lockfile
```

环境为 Node.js 24、pnpm 11.22.0、PowerShell 7。已有 checkout 先检查 `git status`，保留本机改动，再正常拉取 master；不要硬重置。版本、生成文件、测试和配置都已进入 Git，不复制旧电脑的 node_modules、dist、.idea 或用户凭据。

需要 Codex 语言工具时：

```powershell
./scripts/language-services/setup.ps1 -Verify
```

具体见 [语言服务配置](language-services.md)。脚本按本机路径安装并备份配置。当前机器重启 Codex 后 zui_lsp 五个工具与官方 Svelte MCP 均原生调用成功；不能由此推断另一台机器可以热加载。WebStorm MCP 地址从新机器 IDE 设置获取，不照搬旧端口。针对测试文件，LSP 的默认 tsconfig 可能进入推断项目，实际工作区类型检查使用 tsconfig.check.json。

开始实施前先核对交接提交的 CI，只检查结果，不持续轮询：

```powershell
$headCommit = (git rev-parse HEAD).Trim()
gh run list --repo kenconnet666/zui-svelte --workflow ci.yml --commit $headCommit --limit 1
# 如失败，再读取具体失败日志：
gh run view <运行ID> --repo kenconnet666/zui-svelte --log-failed
```

## 当前提交与证据

| 提交         | 内容                                                                 | 已核实结果                                   |
| ------------ | -------------------------------------------------------------------- | -------------------------------------------- |
| 398f483      | 稳定来源排序、SSR 协议 6、A01–A40 台账                               | 完整 CI 35325762599 通过                     |
| 734324b      | StyleProvider、共享/嵌套 scope、100 次切换、独立包禁 JS 与客户端主题 | 完整 CI 35326735754 通过                     |
| 50e11d1      | Portal/ShadowRoot 目标、多轴偏好探针、真实 Docs 演示                 | CI 35327321249 停在 Prettier，后续门槛未执行 |
| 本次交接提交 | 修正上述格式阻塞、保存已确认缺口及恢复顺序                           | 推送后不等待 CI，新电脑核对                  |

50e11d1 的失败只报告 docs/tests/core.spec.ts 格式。已将长调用链拆为局部 info 变量并重新格式化，避免同一表达式的格式反复变化；这不表示该提交的新增浏览器用例已通过。

## 已完成的本轮实现

- 来源顺序从首次挂载计数改为稳定来源字符串与数字位置；来源归零仍释放。新增反向到达、重挂、双变量通道提升、SSR 反向接管和损坏 metadata 回归。
- **兼容变化：** StyleSheet.set 第三个参数与 StyleEntry.order 现为 string。比较码元顺序，再以 key 打破平局；禁止数字相减或依赖 locale 的比较。内部协议为 **6**，所有包与编译产物需一起重建。
- StyleProvider 从 @zui/svelte 根入口导出：scope 必填，默认 div，as 排除 void 标签，透传通用 HTML 属性/class/style/事件。复用已有 runtime，不销毁调用方 scope。
- Provider 主题须匹配 runtime 主题 namespace，包含基础 schema 的键及值种类；自定义 Token 同时配置根 runtime 和 SSR options。服务端不订阅 scope，规则留到 collector 完成输出。
- 根入口含标准 .svelte 源组件，普通 Node 无 loader 不能直接执行；core 仍有直接 Node 导入检查，Svelte 由真实 Vite/Kit 外部包消费验证。
- ProviderTarget 验证同一 scope 在 Portal 和 ShadowRoot 独立挂载；PreferenceProbe 用普通函数组合亮暗/密度/对比度，以 dir 和 CSS media 处理方向/减少动画/forced-colors，没有新增偏好管理 API。
- forced-colors 的浏览器模拟能力写入测试注解；未激活时不能称作该浏览器已验证强制颜色表现。

## 下一步优先处理：两个已复现的 R2 缺陷

本机为了换机收尾，撤回了仅用于证明这两处缺陷的新增失败测试，产品编译器未作半成品修改。以下复现已实际运行失败；新电脑先把它们加入 svelte/tests/compiler.test.ts，再修复。

### 1. 普通文字被误认为编译标记

svelte/src/compiler/preprocess.ts 开头使用 `content.includes(marker)`，所以用户模板里只要出现 zui-class-compiled，整个组件就跳过 ZUI 变换。

```ts
const source =
  '<script>import {css} from "@zui/core";</script><p>zui-class-compiled</p><div class={css(s=>{s.width.px(10);})}/>';
expect(transformClasses(source, '/app/Marker.svelte')).toBeDefined();
```

当前返回 undefined。推荐用 AST 中实际的内部 import、owner 初始化和协议版本识别已编译产物；普通文字/注释不作为证据，仍须保留重复编译保护和旧协议报错。

### 2. source map 将 CSS 表达式映射到属性开头

```ts
import { SourceMap } from 'node:module';
const source =
  '<script lang="ts">\nimport {css} from "@zui/core";\nlet width=$state(10);\n</script>\n<div class={css(s=>{\n  s.width.px(width);\n})}/>';
const result = transformClasses(source, '/app/Mapped.svelte')!;
const locate = (text: string) => {
  const offset = text.indexOf('s.width.px(width)');
  const before = text.slice(0, offset);
  return [before.split('\n').length - 1, offset - before.lastIndexOf('\n') - 1] as const;
};
const entry = new SourceMap(JSON.parse(result.map.toString())).findEntry(...locate(result.code));
expect(entry.originalLine).toBe(locate(source)[0]);
expect(entry.originalColumn).toBe(locate(source)[1]);
```

当前 originalLine 为 4，预期为 5（均从 0 开始）。原因是整个属性被 MagicString.overwrite 成一个生成的 spread，原表达式的逐字符映射丢失。优先保留原表达式源码区间进行改写；还需测试属性间有 bind/style/class 指令时的重排，不能只修单个例子。曾在 .git 内试验 MagicString.move，尚无生产方案，这些临时文件无需迁移。

## 之后的实施顺序

先读 [剩余规划](core-remaining-plan.md)、[验收台账](core-acceptance.md)、[实施记录](implementation.md)。R0 主要顺序反例已修；R1 基础 Provider 已有绿色完整 CI，独立目标和偏好探针仍需核对交接 CI。随后：

1. 修复上面的 R2 两项；补 spread/getter/事件/bind/指令行为对照、snippet/await/错误边界、真实动态 chunk 与 HMR。
2. R3：BrowserStyleSheet 当前仍每 entry 一个 style，写入时全表排序查位置；内存基准不能证明 DOM 规模性能。做有序存储、分片及真实浏览器预算。
3. R4：补 SSR 晚到新 CSS、多根/晚到接管、错误页/redirect/handle 组合。区分流式数据与晚到规则首屏保障。
4. R5：公开 API/类型快照、错误 code 与定位、生成覆盖审计、类型/体积预算、同一 SHA 的全部验收与 tarball 证据。

不扩展业务组件库、recipe DSL 或其他框架适配；统一 @zui/core 入口，css() 仍返回 string。测试遵守模块 test 子目录与独立集成 tests 约定。保留合理中文注释和人工可维护性。

本地只跑相关类型和针对性测试，完整类型/构建/浏览器/包外由 CI 承担。每批中文提交推送，推送后不等待或轮询；下一批前修具体失败。两包仍 private，未发布 npm、未部署公网。

最近已查询的周额度剩余 39%，至少保留 15%；新电脑继续前重新查询实时额度，不能沿用旧百分比。此次按用户换机要求停止，未把剩余生产缺口标为完成。
