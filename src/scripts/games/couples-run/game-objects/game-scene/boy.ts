import { setVelocity } from '../../../../../lib/game-engine/physics-engine';
import gameState from '../../game-state';
import Character from './character';

class Boy extends Character {
  private _doubleJump = false;

  constructor() {
    super('boy');
  }

  jump() {
    if (!this._canJump()) return;

    if (this.moveState === 'jump') {
      this._doubleJump = true;
    }

    setVelocity(this, { x: gameState.speed, y: -10 });
    this.changeState('jump');
  }

  protected changeState(state: 'idle' | 'run' | 'jump') {
    if (this.moveState !== 'jump') {
      this._doubleJump = false;
    }
    super.changeState(state);
  }

  private _canJump() {
    if (this.moveState === 'jump' && !this._doubleJump) {
      return true;
    }

    return this.moveState === 'run' && this.onGround;
  }
}

export default Boy;
