import BaseGameObject from '../base-game-object';
import ContainerComponent from '../components/container';

abstract class BaseScene extends BaseGameObject {
  private _container = new ContainerComponent({});

  get container() {
    return this._container;
  }
}

export default BaseScene;
