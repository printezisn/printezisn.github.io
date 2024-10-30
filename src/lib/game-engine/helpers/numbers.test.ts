import { describe, expect, it } from 'vitest';
import { getRandomInt } from './numbers';

describe('game engine numbers helper', () => {
  describe('getRandomInt', () => {
    it('generates a random integer between min and max', () => {
      const num = getRandomInt(3, 6);
      expect(num).toEqual(Math.floor(num));
      expect(num).toBeGreaterThanOrEqual(3);
      expect(num).toBeLessThanOrEqual(6);
    });

    it('includes the min and max', () => {
      const num = getRandomInt(4, 4);
      expect(num).toEqual(4);
    });
  });
});
