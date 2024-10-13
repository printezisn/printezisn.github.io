import gameState from '../game-state';
import { setMute } from '../sound';
import ButtonComponent from './button';
import type { BaseSpriteProps } from './types';

interface VolumeButtonProps extends BaseSpriteProps {
  hoverResource: string;
  mutedResource: string;
  mutedHoverResource: string;
}

class VolumeButtonComponent extends ButtonComponent {
  constructor(props: VolumeButtonProps) {
    super(props);

    if (gameState.muted) {
      this.texture = this.props.mutedResource;
    }
  }

  get props() {
    return super.props as VolumeButtonProps;
  }

  protected get defaultResource() {
    if (gameState.muted) return this.props.mutedResource;

    return super.defaultResource;
  }

  protected get hoverResource() {
    if (gameState.muted) return this.props.mutedHoverResource;

    return super.hoverResource;
  }

  protected async onClick() {
    super.onClick();

    localStorage.setItem('muted', gameState.muted ? 'false' : 'true');
    gameState.muted = !gameState.muted;

    setMute(gameState.muted);
  }
}

export default VolumeButtonComponent;
