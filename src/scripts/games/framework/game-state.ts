import type BaseScene from './scenes/base';

interface GameState {
  screen: {
    orientation: 'landscape' | 'portrait';
    width: number;
    height: number;
  };
  scene: BaseScene | null;
}

const gameState: GameState = {
  screen: {
    orientation: 'landscape',
    width: 0,
    height: 0,
  },
  scene: null,
};

export default gameState;
