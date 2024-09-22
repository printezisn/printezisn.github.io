import config from './config';
import { addSignalListener, removeSignalListener } from './signals';

abstract class BaseGameObject {
  private _bindings: { name: string; binding: any }[] = [];

  constructor() {
    if ((this as any).onResize) {
      this.registerToSignal(config.signals.onResize, (this as any).onResize);
    }
    if ((this as any).onOrientationChange) {
      this.registerToSignal(
        config.signals.onOrientationChange,
        (this as any).onOrientationChange,
      );
    }
    if ((this as any).onTick) {
      this.registerToSignal(config.signals.onTick, (this as any).onTick);
    }
  }

  protected registerToSignal(name: string, callback: (...args: any[]) => void) {
    this._bindings.push(addSignalListener(name, callback.bind(this)));
  }

  protected unregisterFromSignal(name: string) {
    for (let i = 0; i < this._bindings.length; i++) {
      if (this._bindings[i].name === name) {
        removeSignalListener(name, this._bindings[i].binding);
        this._bindings.splice(i, 1);
        i--;
      }
    }
  }

  destroy() {
    this._bindings.forEach(({ name, binding }) =>
      removeSignalListener(name, binding),
    );
    this._bindings = [];
  }
}

export default BaseGameObject;
