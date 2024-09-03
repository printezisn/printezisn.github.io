import { describe, expect, it } from 'vitest';
import { addModuleStyles } from './style-helpers';

describe('style helpers', () => {
  describe('addModuleStyles', () => {
    it('converts and returns the template based on the styles object', () => {
      const styles = {
        themeSwitch: 'module-theme-switch',
        button: 'module-button',
      };
      const template =
        '<button class="mc:themeSwitch mc:button">Press</button>';

      const result = addModuleStyles(template, styles);

      expect(result).toEqual(
        '<button class="module-theme-switch module-button">Press</button>',
      );
    });
  });
});
