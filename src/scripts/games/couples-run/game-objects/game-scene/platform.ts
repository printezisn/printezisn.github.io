import ContainerComponent from '../../../../../lib/game-engine/components/container';
import TilingSpriteComponent from '../../../../../lib/game-engine/components/tiling-sprite';

class Platform extends ContainerComponent {
  constructor(totalLayers: number, width: number, distance: number) {
    super({
      label: `platform-${distance}`,
      position: { x: distance, y: 0 },
    });

    let dist = (8 - totalLayers) * 32;
    dist += this.addComponent(
      new TilingSpriteComponent({
        label: 'platform-top',
        resource: 'platform-top.png',
        width,
        position: { x: 0, y: dist },
      }),
    ).height;
    for (let i = 0; i < totalLayers; i++) {
      dist += this.addComponent(
        new TilingSpriteComponent({
          label: `platform-middle-${i}`,
          resource: 'platform-middle.png',
          width,
          position: { x: 0, y: dist },
        }),
      ).height;
    }
  }
}

export default Platform;
