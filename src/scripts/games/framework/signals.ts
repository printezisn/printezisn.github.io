import { MiniSignal } from 'mini-signals';

const signals = new Map<string, MiniSignal>();

export const addSignalListener = (
  name: string,
  callback: (...args: any[]) => void,
) => {
  let signal = signals.get(name);

  if (!signal) {
    signal = new MiniSignal();
    signals.set(name, signal);
  }

  return { name, binding: signal.add(callback) };
};

export const removeSignalListener = (name: string, binding: any) => {
  const signal = signals.get(name);
  if (!signal) return;

  signal.detach(binding);
};

export const fireSignal = (name: string, ...args: any[]) => {
  const signal = signals.get(name);
  if (!signal) return;

  signal.dispatch(...args);
};
