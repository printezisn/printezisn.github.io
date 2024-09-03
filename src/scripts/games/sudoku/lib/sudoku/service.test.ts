import { beforeEach, describe, expect, it } from 'vitest';
import {
  analyzeBoard,
  changeColor,
  cloneBoard,
  createBoard,
  setCellValue,
  undoSingle,
  undoColor,
  solveBoard,
} from './service';
import { ActionType, type Board, Difficulty } from './models';

describe('sudoku service', () => {
  let board: Board;

  beforeEach(() => {
    board = createBoard(Difficulty.EMPTY);
  });

  describe('cloneBoard', () => {
    it('returns a cloned version of the board', () => {
      for (let i = 0; i < board.cells.length; i++) {
        board.cells[i].value = Math.floor(Math.random() * 9) + 1;
      }

      analyzeBoard(board);
      const clone = cloneBoard(board);

      expect(clone).toEqual(board);
    });
  });

  describe('analyzeBoard', () => {
    it('sets available cell options correctly', () => {
      board.cells[40].value = 5;
      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const group = Math.floor(row / 3) * 3 + Math.floor(col / 3);

        if ((row === 4 || col === 4 || group === 4) && i !== 40) {
          expect(board.cells[i].options).toEqual(
            new Set([1, 2, 3, 4, 6, 7, 8, 9]),
          );
        } else {
          expect(board.cells[i].options).toEqual(
            new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
          );
        }

        expect(board.cells[i].hasError).toBeFalsy();
      }

      expect(board.finished).toBeFalsy();
    });

    it('detects errored cells', () => {
      board.cells[40].value = 5;
      board.cells[39].value = 4;
      board.cells[13].value = 5;
      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        if (i === 40 || i === 13) {
          expect(board.cells[i].hasError).toBeTruthy();
          expect(board.cells[i].options).not.toContain(5);
        } else {
          expect(board.cells[i].hasError).toBeFalsy();
        }
      }

      expect(board.finished).toBeFalsy();
    });

    it('detects errored cells', () => {
      board.cells[40].value = 5;
      board.cells[39].value = 4;
      board.cells[13].value = 5;
      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        if (i === 40 || i === 13) {
          expect(board.cells[i].hasError).toBeTruthy();
          expect(board.cells[i].options).not.toContain(5);
        } else {
          expect(board.cells[i].hasError).toBeFalsy();
        }
      }

      expect(board.finished).toBeFalsy();
    });

    it('sets board as finished if all cells have correct values', () => {
      const values = [
        3, 4, 5, 2, 7, 9, 1, 6, 8, 7, 6, 9, 1, 4, 8, 3, 5, 2, 8, 2, 1, 5, 6, 3,
        9, 4, 7, 5, 8, 7, 6, 1, 4, 2, 9, 3, 9, 3, 4, 8, 2, 7, 6, 1, 5, 6, 1, 2,
        3, 9, 5, 7, 8, 4, 4, 5, 6, 7, 3, 1, 8, 2, 9, 2, 9, 3, 4, 8, 6, 5, 7, 1,
        1, 7, 8, 9, 5, 2, 4, 3, 6,
      ];
      for (let i = 0; i < values.length; i++) {
        board.cells[i].value = values[i];
      }

      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        expect(board.cells[i].options).toEqual(new Set([board.cells[i].value]));
        expect(board.cells[i].hasError).toBeFalsy();
      }

      expect(board.finished).toBeTruthy();
    });

    it('does not set board as finished if some cells have incorrect values', () => {
      const values = [
        3, 5, 5, 2, 7, 9, 1, 6, 8, 7, 6, 9, 1, 4, 8, 3, 5, 2, 8, 2, 1, 5, 6, 3,
        9, 4, 7, 5, 8, 7, 6, 1, 4, 2, 9, 3, 9, 3, 4, 8, 2, 7, 6, 1, 5, 6, 1, 2,
        3, 9, 5, 7, 8, 4, 4, 5, 6, 7, 3, 1, 8, 2, 9, 2, 9, 3, 4, 8, 6, 5, 7, 1,
        1, 7, 8, 9, 5, 2, 4, 3, 6,
      ];
      for (let i = 0; i < values.length; i++) {
        board.cells[i].value = values[i];
      }

      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        if (i === 1 || i === 2 || i === 55) {
          expect(board.cells[i].hasError).toBeTruthy();
        } else {
          expect(board.cells[i].hasError).toBeFalsy();
        }
      }

      expect(board.finished).toBeFalsy();
    });
  });

  describe('changeColor', () => {
    it('changes to the correct color when it is below limit', () => {
      board.currentColor = 2;
      changeColor(board);

      expect(board.currentColor).toEqual(3);
      expect(board.actions[0]).toEqual({
        cellIndex: null,
        from: 2,
        to: 3,
        type: ActionType.COLOR_CHANGE,
      });
    });

    it('changes to the correct color when it is on limit', () => {
      board.currentColor = 4;
      changeColor(board);

      expect(board.currentColor).toEqual(0);
      expect(board.actions[0]).toEqual({
        cellIndex: null,
        from: 4,
        to: 0,
        type: ActionType.COLOR_CHANGE,
      });
    });
  });

  describe('setCellValue', () => {
    it('sets the cell value successfully', () => {
      board.currentColor = 1;
      setCellValue(board, 4, 5);

      expect(board.cells[4].value).toEqual(5);
      expect(board.cells[4].color).toEqual(1);
      expect(board.cells[5].options).toEqual(new Set([1, 2, 3, 4, 6, 7, 8, 9]));
      expect(board.actions).toEqual([
        {
          type: ActionType.CELL_CHANGE,
          from: null,
          to: 5,
          cellIndex: 4,
        },
      ]);
    });
  });

  describe('undoSingle', () => {
    it('undoes cell change action', () => {
      board.actions.push({
        cellIndex: 4,
        from: 5,
        to: 6,
        type: ActionType.CELL_CHANGE,
      });

      undoSingle(board);

      expect(board.cells[4].value).toEqual(5);
      expect(board.actions).toEqual([]);
      expect(board.cells[5].options).toEqual(new Set([1, 2, 3, 4, 6, 7, 8, 9]));
    });

    it('undoes color change action', () => {
      board.actions.push({
        cellIndex: null,
        from: 2,
        to: 3,
        type: ActionType.COLOR_CHANGE,
      });

      undoSingle(board);

      expect(board.currentColor).toEqual(2);
      expect(board.actions).toEqual([]);
    });

    it('performs no action if there are no action on the board', () => {
      undoSingle(board);

      expect(board.actions).toEqual([]);
    });
  });

  describe('undoColor', () => {
    it('undoes all actions of the current color', () => {
      board.actions.push({
        type: ActionType.CELL_CHANGE,
        cellIndex: 3,
        from: 8,
        to: 9,
      });
      board.actions.push({
        type: ActionType.COLOR_CHANGE,
        from: 1,
        to: 2,
        cellIndex: null,
      });
      board.actions.push({
        type: ActionType.CELL_CHANGE,
        cellIndex: 1,
        from: 2,
        to: 3,
      });
      board.actions.push({
        type: ActionType.CELL_CHANGE,
        cellIndex: 2,
        from: 5,
        to: 6,
      });

      undoColor(board);

      expect(board.actions).toEqual([
        {
          type: ActionType.CELL_CHANGE,
          cellIndex: 3,
          from: 8,
          to: 9,
        },
      ]);
      expect(board.currentColor).toEqual(1);
      expect(board.cells[1].value).toEqual(2);
      expect(board.cells[2].value).toEqual(5);
      expect(board.cells[3].value).toBeNull();
      expect(board.cells[3].options).toEqual(new Set([1, 3, 4, 6, 7, 8, 9]));
    });
  });

  describe('solveBoard', () => {
    it('returns the solution if the board can be solved', () => {
      analyzeBoard(board);
      const solution = solveBoard(board);

      expect(solution).not.toBeNull();
      expect(solution?.finished).toBeTruthy();
      solution?.cells.forEach((cell) => {
        expect(cell.value).not.toBeNull();
        expect(cell.hasError).toBeFalsy();
      });
    });

    it('returns null if the board cannot be solved', () => {
      board.cells[0].value = 2;
      board.cells[17].value = 2;
      board.cells[30].value = 2;
      board.cells[58].value = 2;
      board.cells[23].value = 3;

      analyzeBoard(board);
      const solution = solveBoard(board);

      expect(solution).toBeNull();
    });
  });

  describe('createBoard', () => {
    const testForCorrectBoard = (
      difficulty: Difficulty,
      expectedVisibleCells: number,
    ) => {
      let totalVisibleCells = 0;
      board = createBoard(difficulty);

      expect(board).toMatchObject({
        finished: false,
        currentColor: 0,
        actions: [],
      });
      board.cells.forEach((cell) => {
        if (cell.value == null) {
          expect(cell).toMatchObject({
            value: null,
            color: 0,
            hasError: false,
            initial: false,
          });
        } else {
          totalVisibleCells++;
          expect(cell).toMatchObject({
            color: 0,
            hasError: false,
            initial: true,
          });
        }

        expect(cell.options.size > 0).toBeTruthy();
      });

      expect(totalVisibleCells).toEqual(expectedVisibleCells);
    };

    it('creates a new board for empty difficulty if requested', () => {
      testForCorrectBoard(Difficulty.EMPTY, 0);
    });

    it('creates a new board for easy difficulty if requested', () => {
      testForCorrectBoard(Difficulty.EASY, 40);
    });

    it('creates a new board for normal difficulty if requested', () => {
      testForCorrectBoard(Difficulty.NORMAL, 35);
    });

    it('creates a new board for hard difficulty if requested', () => {
      testForCorrectBoard(Difficulty.HARD, 30);
    });
  });
});
