import { Application } from 'pixi.js';

interface Config {
  colors: {
    backgroundColor: string;
  };
}

let app!: Application;

export const initGame = async (container: HTMLElement, config: Config) => {
  app = new Application();

  await app.init({
    backgroundColor: config.colors.backgroundColor,
    resizeTo: window,
  });

  container.appendChild(app.canvas);
};
