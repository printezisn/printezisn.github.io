import Character from './character';

class Boy extends Character {
  get hasPressAndRelease() {
    return false;
  }

  get totalAllowedJumps() {
    return 2;
  }

  constructor() {
    super('boy');
  }
}

export default Boy;
