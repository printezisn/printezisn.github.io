import { describe, expect, it } from 'vitest';
import { debounce } from './closures';
import { timeout } from './promises';

describe('game engine closures', () => {
  describe('debounce', () => {
    it('runs frequent calls only once', async () => {
      let totalCalls = 0;
      const callback = debounce(() => {
        totalCalls++;
      });

      callback();
      callback();
      callback();
      await timeout(600);

      expect(totalCalls).toEqual(1);
    });
  });
});
