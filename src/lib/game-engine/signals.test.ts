import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { addSignalListener, fireSignal, removeSignalListener } from './signals';

describe('game engine signals', () => {
  const name = 'test-signal';
  let result = 0;
  let binding: any;

  const callback = () => {
    result++;
  };

  beforeEach(() => {
    result = 0;
    binding = null;
  });

  afterEach(() => {
    removeSignalListener(name, binding);
  });

  it('calls subscribed callbacks', () => {
    binding = addSignalListener(name, callback).binding;
    fireSignal(name);

    expect(result).toEqual(1);
  });

  it('does not call unsubscribed callbacks', () => {
    binding = addSignalListener(name, callback).binding;
    removeSignalListener(name, binding);
    fireSignal(name);

    expect(result).toEqual(0);
  });
});
