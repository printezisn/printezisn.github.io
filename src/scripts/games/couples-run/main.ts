import { Application } from 'pixi.js';
import '../../base';
import '../../../styles/games/couples-run/main.scss';

const init = async () => {
  const app = new Application();

  await app.init({ background: '#000000', resizeTo: window });

  document.body.appendChild(app.canvas);
};

init();
