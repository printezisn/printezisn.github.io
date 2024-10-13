import type BaseScene from './scenes/base';

interface GameState {
  screen: {
    orientation: 'landscape' | 'portrait';
    width: number;
    height: number;
  };
  scene: BaseScene | null;
  muted: boolean;
}

const gameState: GameState = {
  screen: {
    orientation: 'landscape',
    width: 0,
    height: 0,
  },
  scene: null,
  muted: localStorage.getItem('muted') === 'true',
};

export default gameState;
