import { setMovement } from '../../../../../lib/game-engine/physics-engine';
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
    if (!this._canJump()) return;

    setMovement(this, {
      linearMovement: {
        velocity: {
          x: gameState.speed,
          y: -10,
        },
      },
    });
    this.changeState('jump');
  }

  press() {
    if (!this._canJump()) return;

    gameState.speed = Math.floor(gameState.speed / 2);
    setMovement(this, {
      linearMovement: {
        velocity: {
          x: gameState.speed,
          y: 0,
        },
      },
    });
  }

  release() {
    if (!this._canJump()) return;

    gameState.speed = gameState.originalSpeed;
    setMovement(this, {
      linearMovement: {
        velocity: {
          x: gameState.speed,
          y: -15,
        },
      },
    });
    this.changeState('jump');
  }

  private _canJump() {
    return this.moveState === 'run' && this.onGround;
  }
}

export default Girl;
