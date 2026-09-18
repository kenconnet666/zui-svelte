/** 故障注入用的最小 DOM 替身；真实 CSS 计算与接管仍由浏览器测试验证。 */
export function elementTarget() {
  const values = new Map<string, string>();
  const priorities = new Map<string, string>();
  const classes = new Set<string>();
  const node = {
    classList: {
      add: (name: string) => classes.add(name),
      remove: (name: string) => classes.delete(name),
    },
    style: {
      getPropertyValue: (name: string) => values.get(name) ?? '',
      getPropertyPriority: (name: string) => priorities.get(name) ?? '',
      setProperty: (name: string, value: string, priority = '') => {
        values.set(name, value);
        priorities.set(name, priority);
      },
      removeProperty: (name: string) => {
        const previous = values.get(name) ?? '';
        values.delete(name);
        priorities.delete(name);
        return previous;
      },
    },
  } as unknown as HTMLElement;
  return { node, values, classes };
}
