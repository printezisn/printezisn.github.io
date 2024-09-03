import { describe, it } from 'vitest';
import { waitFor } from './test-helpers';

describe('test helpers', () => {
  describe('waitFor', () => {
    it('retries in case of exception', async () => {
      let error = true;

      await waitFor(() => {
        if (error) {
          error = false;
          throw new Error('Test error');
        }
      });
    });
  });
});
