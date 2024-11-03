const config = {
  sounds: {
    mainLoop: 'main-loop',
    menuLoop: 'menu-loop',
    gameOver: 'game-over',
    coin: 'coin',
    playerHit: 'player-hit',
  },
  signals: {
    goToIntro: 'goToIntro',
    goToGame: 'goToGame',
    chooseCharacter: 'chooseCharacter',
    loseLifePoints: 'loseLifePoints',
    gameOver: 'gameOver',
    moveScreen: 'moveScreen',
    updateScore: 'updateScore',
  },
  lifePoints: 3,
  hasWatchedIntro: localStorage.getItem('couplesRun_watchedIntro') === 'true',
};

export default config;
