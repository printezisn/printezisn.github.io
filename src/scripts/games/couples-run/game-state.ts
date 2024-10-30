interface GameState {
  selectedCharacter: 'girl' | 'boy';
  started: boolean;
  speed: number;
  score: number;
}

const gameState: GameState = {
  selectedCharacter: 'girl',
  started: false,
  speed: 1,
  score: 0,
};

export default gameState;
