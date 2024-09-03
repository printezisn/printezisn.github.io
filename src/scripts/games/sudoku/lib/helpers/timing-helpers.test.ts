import { describe, expect, it } from 'vitest';
import { debounce } from './timing-helpers';
import { waitFor } from './test-helpers';

describe('timing helpers', () => {
  describe('debounce', () => {
    it('eventually calls the callback', async () => {
      const states: boolean[] = [];

      const { start, cancel } = debounce(
        () => {
          states.push(true);
        },
        () => {
          states.push(false);
        },
        10,
        20,
      );

      start();

      await waitFor(() => expect(states).toEqual([true]));

      cancel();

      await waitFor(() => expect(states).toEqual([true, false]));
    });

    it('nevers calls the callback if cancelled immediately', async () => {
      const states: boolean[] = [];

      const { start, cancel } = debounce(
        () => {
          states.push(true);
        },
        () => {
          states.push(false);
        },
        10,
        20,
      );

      start();
      cancel();

      expect(states).toEqual([false]);
    });
  });
});
