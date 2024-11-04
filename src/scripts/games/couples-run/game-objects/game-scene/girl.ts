import Character from './character';

class Girl extends Character {
  protected get increaseSpeedMilestone() {
    return 20000;
  }

  get hasPressAndRelease() {
    return true;
  }

  protected get totalAllowedJumps() {
    return 1;
  }

  constructor() {
    super('girl');
  }
}

export default Girl;
