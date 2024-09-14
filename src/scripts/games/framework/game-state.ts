interface GameState {
  screen: {
    orientation: 'landscape' | 'portrait';
    width: number;
    height: number;
  };
}

const gameState: GameState = {
  screen: {
    orientation: 'landscape',
    width: 0,
    height: 0,
  },
};

export default gameState;
