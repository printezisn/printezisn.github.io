import ContainerComponent from '../../../../../lib/game-engine/components/container';
import TilingSpriteComponent from '../../../../../lib/game-engine/components/tiling-sprite';
import { getRandomInt } from '../../../../../lib/game-engine/helpers/numbers';
import { addPhysicalEntity } from '../../../../../lib/game-engine/physics-engine';
import Drink from './drink';

class Platform extends ContainerComponent {
  private _topOffset = 0;

  constructor(totalLayers: number, width: number, distance: number) {
    super({
      label: `platform-${distance}`,
      position: { x: distance, y: 0 },
    });

    this._topOffset = (8 - totalLayers) * 32;

    let dist = this._topOffset;
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

    addPhysicalEntity({
      target: this,
      rectangle: {
        x: this.x,
        y: this.components[0].position.y + 4,
        width: this.width,
        height: this.height - 4,
      },
      surface: true,
    });

    this._createDrinks(distance);
  }

  private _createDrinks(distance: number) {
    let x = distance === 0 ? 200 : 0;
    const drinkWidth = 37;
    const drinkHeight = 49;
    const maxLayers = 5;
    const maxDrinksInSeries = 5;

    while (x + drinkWidth <= this.width) {
      x = getRandomInt(x, x + this.width - drinkWidth);
      const y =
        this._topOffset -
        drinkHeight -
        getRandomInt(0, maxLayers) * drinkHeight;
      const drinksInSeries = getRandomInt(0, maxDrinksInSeries);

      for (let i = 0; i < drinksInSeries && x + drinkWidth <= this.width; i++) {
        this.addComponent(new Drink({ x, y }, distance));

        x += drinkWidth;
      }

      x += 20;
    }
  }
}

export default Platform;
