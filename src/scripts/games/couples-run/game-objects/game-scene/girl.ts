import gameState from '../../game-state';
import Character from './character';

class Girl extends Character {
  get hasPressAndRelease() {
    return true;
  }

  constructor() {
    super('girl');
  }

  jump() {
    if (this.moveState !== 'run') return;

    this.velocity = { x: 0, y: -gameState.speed * 2 };
    this.acceleration = { x: 0, y: gameState.speed / 25 };
    this.changeState('jump');
  }

  press() {
    if (this.moveState !== 'run') return;

    gameState.speed = gameState.originalSpeed / 2;
  }

  release() {
    if (this.moveState !== 'run') return;

    gameState.speed = gameState.originalSpeed;

    this.velocity = { x: 0, y: -gameState.originalSpeed * 3 };
    this.acceleration = { x: 0, y: gameState.originalSpeed / 25 };
    this.changeState('jump');
  }
}

export default Girl;
