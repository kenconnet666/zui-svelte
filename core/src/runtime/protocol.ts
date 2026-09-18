/** @internal 编译产物与 SSR 接管数据共用版本；破坏协议时必须递增。 */
export const styleProtocol = Object.freeze({
  version: 1,
  check(version: unknown): void {
    if (version !== this.version)
      throw new Error(
        'ZUI style protocol mismatch: expected ' +
          this.version +
          ', received ' +
          String(version) +
          '.',
      );
  },
});
