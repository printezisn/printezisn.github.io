interface GameState {
  selectedCharacter: 'girl' | 'boy';
  started: boolean;
  speed: number;
  originalSpeed: number;
  score: number;
}

const gameState: GameState = {
  selectedCharacter: 'girl',
  started: false,
  speed: 3,
  originalSpeed: 3,
  score: 0,
};

export default gameState;
