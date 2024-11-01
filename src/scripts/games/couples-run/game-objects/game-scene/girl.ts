import Character from './character';

class Girl extends Character {
  get hasPressAndRelease() {
    return true;
  }

  get totalAllowedJumps() {
    return 1;
  }

  constructor() {
    super('girl');
  }
}

export default Girl;
