const gates = new Map<string, () => void>();

export function delayedValue(gate: string | null): Promise<string> {
  if (!gate) return Promise.resolve('stream-ready');
  return new Promise((resolve) => {
    // 测试显式放行，避免用运行耗时猜测首屏是否真正流式输出。
    const finish = () => {
      clearTimeout(timer);
      gates.delete(gate);
      resolve('stream-ready');
    };
    const timer = setTimeout(finish, 30000);
    gates.set(gate, finish);
  });
}

export function releaseGate(gate: string) {
  gates.get(gate)?.();
}
