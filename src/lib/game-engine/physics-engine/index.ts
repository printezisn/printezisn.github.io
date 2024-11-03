import {
  Engine,
  Bodies,
  Composite,
  Body,
  type IBodyDefinition,
  Events,
} from 'matter-js';
import type { Movement, PhysicalEntity, Target } from './types';

let engine!: Engine;
const entities = new Map<string, PhysicalEntity>();
const touchingGround = new Map<string, number>();
const entitiesToUpdate = new Map<string, PhysicalEntity>();
let entityLabel = 0;

export const initPhysicsEngine = () => {
  engine = Engine.create();

  Events.on(engine, 'collisionStart', (e) => {
    e.pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      const entityA = entities.get(bodyA.label);
      const entityB = entities.get(bodyB.label);
      if (!entityA || !entityB) return;

      const surface = [entityA, entityB].find((entity) => entity.surface);
      const nonSurface = [entityA, entityB].find((entity) => !entity.surface);

      if (!nonSurface) return;

      if (surface) {
        touchingGround.set(
          nonSurface.target.matterBody!.label,
          Math.floor(getBounds(surface).y1),
        );
      } else {
        entityA.onCollision?.(entityB.target);
        entityB.onCollision?.(entityA.target);
      }
    });
  });

  Events.on(engine, 'collisionEnd', (e) => {
    e.pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      const entityA = entities.get(bodyA.label);
      const entityB = entities.get(bodyB.label);
      if (!entityA || !entityB) return;

      const surface = [entityA, entityB].find((entity) => entity.surface);
      const nonSurface = [entityA, entityB].find((entity) => !entity.surface);
      if (!nonSurface) return;

      if (surface) {
        touchingGround.delete(nonSurface.target.matterBody!.label);
      }
    });
  });

  Events.on(engine, 'afterUpdate', () => {
    entitiesToUpdate.forEach((entity) => {
      if (!entity.target.matterBody) return;

      const bounds = getBounds(entity);
      const onGround =
        (touchingGround.get(entity.target.matterBody.label) ?? -Infinity) >=
        Math.floor(bounds.y2);
      entity.onUpdatePosition?.(bounds.x1, bounds.y1, onGround);
    });
  });
};

export const updatePhysics = (interval: number) => {
  Engine.update(engine, interval);
};

export const addPhysicalEntity = (entity: PhysicalEntity) => {
  if (entity.rectangle) {
    entity.target.matterBody = Bodies.rectangle(
      entity.rectangle.x + entity.rectangle.width / 2,
      entity.rectangle.y + entity.rectangle.height / 2,
      entity.rectangle.width,
      entity.rectangle.height,
      createBodyDefinitionOptions(entity),
    );
  } else if (entity.circle) {
    entity.target.matterBody = Bodies.circle(
      entity.circle.x,
      entity.circle.y,
      entity.circle.radius,
      createBodyDefinitionOptions(entity),
    );
  } else {
    throw new Error('No body specification provided');
  }

  entities.set(entity.target.matterBody.label, entity);
  if (entity.onUpdatePosition) {
    entitiesToUpdate.set(entity.target.matterBody.label, entity);
  }
  Composite.add(engine.world, entity.target.matterBody);

  if (entity.movement) {
    setMovement(entity.target, entity.movement);
  }
};

export const removePhysicalEntity = (target: Target) => {
  if (!target.matterBody) return;

  Composite.remove(engine.world, target.matterBody);
  entities.delete(target.matterBody.label);
  touchingGround.delete(target.matterBody.label);
  entitiesToUpdate.delete(target.matterBody.label);
};

export const setMovement = (target: Target, movement: Movement) => {
  if (!target.matterBody) return;

  if (movement.linearMovement) {
    Body.setVelocity(target.matterBody, movement.linearMovement.velocity);
  }
};

export const movePhysicalEntity = (target: Target, x: number, y: number) => {
  if (!target.matterBody) return;

  Body.setPosition(target.matterBody, {
    x: target.matterBody.position.x + x,
    y: target.matterBody.position.y + y,
  });
};

const createBodyDefinitionOptions = (
  entity: PhysicalEntity,
): IBodyDefinition => {
  entityLabel++;

  if (entity.surface) {
    return {
      isStatic: true,
      label: entityLabel.toString(),
      inertia: Infinity,
      inverseInertia: 0,
      restitution: 0,
    };
  }

  if (entity.movement?.linearMovement) {
    return {
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      inertia: Infinity,
      inverseInertia: 0,
      restitution: 0,
      label: entityLabel.toString(),
    };
  }

  return {
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    restitution: 0,
    isSensor: true,
    label: entityLabel.toString(),
  };
};

const getBounds = (entity: PhysicalEntity) => {
  if (!entity.target.matterBody) return { x1: 0, y1: 0, x2: 0, y2: 0 };
  if (entity.rectangle) {
    return {
      x1: entity.target.matterBody.position.x - entity.rectangle.width / 2,
      y1: entity.target.matterBody.position.y - entity.rectangle.height / 2,
      x2: entity.target.matterBody.position.x + entity.rectangle.width / 2,
      y2: entity.target.matterBody.position.y + entity.rectangle.height / 2,
    };
  }
  if (entity.circle) {
    return {
      x1: entity.target.matterBody.position.x - entity.circle.radius,
      y1: entity.target.matterBody.position.y - entity.circle.radius,
      x2: entity.target.matterBody.position.x + entity.circle.radius,
      y2: entity.target.matterBody.position.y + entity.circle.radius,
    };
  }

  return { x1: 0, y1: 0, x2: 0, y2: 0 };
};
