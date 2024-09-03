import { describe, expect, it } from 'vitest';
import Worker from './worker?worker';
import { Difficulty, type WorkerMessage, WorkerMessageType } from './models';
import { createBoard } from './service';

describe('sudoku worker', () => {
  it('creates new board when requested', async () => {
    const worker = new Worker();

    await new Promise<void>((resolve) => {
      worker.onmessage = (e) => {
        const message = e.data as WorkerMessage;

        expect(message).toMatchObject({
          type: WorkerMessageType.CREATE_NEW,
          difficulty: Difficulty.NORMAL,
        });
        expect(message.board).toBeTruthy();

        resolve();
      };

      worker.postMessage({
        type: WorkerMessageType.CREATE_NEW,
        difficulty: Difficulty.NORMAL,
      } as WorkerMessage);
    });
  });

  it('solves a board when requested', async () => {
    const worker = new Worker();
    const board = createBoard(Difficulty.EMPTY);

    await new Promise<void>((resolve) => {
      worker.onmessage = (e) => {
        const message = e.data as WorkerMessage;

        expect(message.type).toEqual(WorkerMessageType.SOLVE);
        expect(message.board?.finished).toBeTruthy();

        resolve();
      };

      worker.postMessage({
        type: WorkerMessageType.SOLVE,
        board,
      } as WorkerMessage);
    });
  });
});
