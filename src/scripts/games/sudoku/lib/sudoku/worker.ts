import {
  type Board,
  Difficulty,
  type WorkerMessage,
  WorkerMessageType,
} from './models';
import { createBoard, solveBoard } from './service';

self.onmessage = (e) => {
  const message = e.data as WorkerMessage;

  switch (message.type) {
    case WorkerMessageType.CREATE_NEW: {
      const board = createBoard(message.difficulty as Difficulty);
      postMessage({
        ...message,
        board,
      } as WorkerMessage);
      break;
    }
    case WorkerMessageType.SOLVE: {
      const board = solveBoard(message.board as Board);
      postMessage({
        ...message,
        board,
      } as WorkerMessage);
      break;
    }
  }
};
