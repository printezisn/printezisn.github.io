import { Container } from 'pixi.js';
import BaseGameObject from '../base-game-object';

abstract class BaseScene extends BaseGameObject {
  private _container: Container = new Container({ x: 0, y: 0 });

  get container() {
    return this._container;
  }
}

export default BaseScene;
