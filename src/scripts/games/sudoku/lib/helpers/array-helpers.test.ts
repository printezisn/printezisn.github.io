import { describe, expect, it } from 'vitest';
import { shuffle } from './array-helpers';

describe('array helpers', () => {
  describe('shuffle', () => {
    it('returns a shuffled version of the array', () => {
      const arr = Array(100)
        .fill(0)
        .map((_, i) => i);
      const result = shuffle(arr);

      expect(result).not.toEqual(arr);
      expect(result.sort()).toEqual(arr.sort());
    });
  });
});
