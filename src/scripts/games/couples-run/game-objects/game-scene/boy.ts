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

    this.velocity = { x: 0, y: -15 };
    this.acceleration = { x: 0, y: 0.5 };
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
