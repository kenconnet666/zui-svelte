import { describe, expect, it } from 'vitest';
import { baseTheme } from '../base.js';
import { createRuntime } from '../../runtime/runtime.js';

describe('CSS-only core defaults', () => {
  it('creates no preset variables and still supports standard CSS keywords and units', () => {
    const runtime = createRuntime();
    try {
      expect(runtime.defaultTheme).toBe(baseTheme);
      expect(baseTheme.resolved).toEqual({});
      runtime.themeStyle(':root');
      expect(runtime.styleTags()).toBe('');
      runtime.css((s) => {
        s.display.flex;
        s.width.px(120);
      });
      expect(runtime.cssText()).toContain('width:120px');
      expect(runtime.cssText()).not.toContain('--z-color');
    } finally {
      runtime.dispose();
    }
  });
});
