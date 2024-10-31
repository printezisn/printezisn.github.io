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

    this.velocity = { x: 0, y: -gameState.speed * 2 };
    this.acceleration = { x: 0, y: gameState.speed / 25 };
    this.changeState('jump');
  }

  private _canJump() {
    if (this.moveState === 'jump' && !this._doubleJump) {
      return true;
    }

    return this.moveState === 'run';
  }
}

export default Boy;
