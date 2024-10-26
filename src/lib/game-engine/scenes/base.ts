import ContainerComponent from '../components/container';

class BaseScene extends ContainerComponent {
  constructor() {
    super({ label: 'Scene' });
  }

  async init() {}
}

export default BaseScene;
