import { describe, expect, it } from 'vitest';
import { createBoard } from './service';
import { Difficulty } from './models';
import { loadBoard, saveBoard } from './repo';

describe('sudoku repository', () => {
  it('stores boards into local storage', () => {
    const board = createBoard(Difficulty.EASY);
    saveBoard(board);

    const savedBoard = loadBoard();
    expect(savedBoard).toEqual(board);
  });
});
