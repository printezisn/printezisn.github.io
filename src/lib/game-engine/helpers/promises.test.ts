import { describe, it } from 'vitest';
import { timeout } from './promises';

describe('game engine promises', () => {
  describe('timeout', () => {
    it('resolves eventually', async () => {
      await timeout(500);
    });
  });
});
