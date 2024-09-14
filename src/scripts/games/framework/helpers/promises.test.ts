import { describe, it } from 'vitest';
import { timeout } from './promises';

describe('framework promises', () => {
  describe('timeout', () => {
    it('resolves eventually', async () => {
      await timeout(500);
    });
  });
});
