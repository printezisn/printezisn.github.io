interface GameState {
  selectedCharacter: 'girl' | 'boy';
  started: boolean;
  speed: number;
}

const gameState: GameState = {
  selectedCharacter: 'girl',
  started: false,
  speed: 1,
};

export default gameState;
