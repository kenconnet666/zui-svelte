/** 一个消费者失败不能阻断其余通知或资源清理；完成全部动作后统一报告。 */
export function runAll(actions: Iterable<() => void>, message: string): void {
  const errors: unknown[] = [];
  for (const action of actions) {
    try {
      action();
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length) throw new AggregateError(errors, message);
}
