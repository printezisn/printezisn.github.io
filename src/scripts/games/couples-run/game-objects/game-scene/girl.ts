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

    this.velocity = { x: 0, y: -15 };
    this.acceleration = { x: 0, y: 0.5 };
    this.changeState('jump');
  }

  press() {
    if (this.moveState !== 'run') return;

    gameState.speed = gameState.originalSpeed / 2;
  }

  release() {
    if (this.moveState !== 'run') return;

    gameState.speed = gameState.originalSpeed;

    this.velocity = { x: 0, y: -40 };
    this.acceleration = { x: 0, y: 1.5 };
    this.changeState('jump');
  }
}

export default Girl;
