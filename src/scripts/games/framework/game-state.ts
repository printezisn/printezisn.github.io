import type ContainerComponent from './components/container';

interface GameState {
  screen: {
    orientation: 'landscape' | 'portrait';
    width: number;
    height: number;
  };
  scene: ContainerComponent | null;
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
