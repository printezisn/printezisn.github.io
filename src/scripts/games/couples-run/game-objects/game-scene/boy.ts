import Character from './character';

class Boy extends Character {
  protected get increaseSpeedMilestone() {
    return 10000;
  }

  get hasPressAndRelease() {
    return false;
  }

  protected get totalAllowedJumps() {
    return 2;
  }

  constructor() {
    super('boy');
  }
}

export default Boy;
