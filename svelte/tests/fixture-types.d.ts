// 工作区不安装包外 fixture 依赖；独立消费者直接检查实际包内的 .svelte 文件。
declare module 'zui-fixture-plain' {
  import type { Component } from 'svelte';
  const Plain: Component<{ class?: string }>;
  export default Plain;
}
