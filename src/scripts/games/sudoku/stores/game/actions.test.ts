import { beforeEach, describe, expect, it } from 'vitest';
import {
  changeColor,
  initGame,
  newEasyGame,
  newEmptyGame,
  newHardGame,
  newNormalGame,
  solve,
  state,
  undoColor,
  undoOne,
  updateCell,
} from './actions';
import * as service from '../../lib/sudoku/service';
import { Difficulty } from '../../lib/sudoku/models';
import { waitFor } from '../../lib/helpers/test-helpers';
import { SET_GAME_LOADING_ACTION, UPDATE_BOARD_ACTION } from './constants';
import { loadBoard } from '../../lib/sudoku/repo';

describe('game store actions', () => {
  beforeEach(() => {
    state.board = service.createBoard(Difficulty.EMPTY);
    state.loading = false;
    state.initialized = true;
    localStorage.removeItem('board');
  });

  describe('initGame', () => {
    it('creates a new easy game if there is no saved game', async () => {
      let totalValues = 0;
      const loadingStates: boolean[] = [];

      state.initialized = false;

      window.addEventListener(SET_GAME_LOADING_ACTION, () => {
        loadingStates.push(state.loading);
      });

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        totalValues = state.board.cells.filter((c) => c.value != null).length;
      });

      initGame();

      await waitFor(() => expect(totalValues).toEqual(40));
      expect(loadingStates).toContain(false);
    });

    it('performs no action if there is a saved board', async () => {
      let totalValues = 0;

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        totalValues = state.board.cells.filter((c) => c.value != null).length;
      });

      initGame();

      await waitFor(() => expect(totalValues).toEqual(0));
    });
  });

  describe('newEasyGame', () => {
    it('creates a new easy game', async () => {
      let totalValues = 0;
      const loadingStates: boolean[] = [];

      window.addEventListener(SET_GAME_LOADING_ACTION, () => {
        loadingStates.push(state.loading);
      });

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        totalValues = state.board.cells.filter((c) => c.value != null).length;
      });

      newEasyGame();

      await waitFor(() => expect(totalValues).toEqual(40));
      expect(loadingStates).toContain(false);
    });

    it('saves the game', async () => {
      newEasyGame();

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });

  describe('newNormalGame', () => {
    it('creates a new normal game', async () => {
      let totalValues = 0;
      const loadingStates: boolean[] = [];

      window.addEventListener(SET_GAME_LOADING_ACTION, () => {
        loadingStates.push(state.loading);
      });

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        totalValues = state.board.cells.filter((c) => c.value != null).length;
      });

      newNormalGame();

      await waitFor(() => expect(totalValues).toEqual(35));
      expect(loadingStates).toContain(false);
    });

    it('saves the game', async () => {
      newNormalGame();

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });

  describe('newHardGame', () => {
    it('creates a new normal game', async () => {
      let totalValues = 0;
      const loadingStates: boolean[] = [];

      window.addEventListener(SET_GAME_LOADING_ACTION, () => {
        loadingStates.push(state.loading);
      });

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        totalValues = state.board.cells.filter((c) => c.value != null).length;
      });

      newHardGame();

      await waitFor(() => expect(totalValues).toEqual(30));
      expect(loadingStates).toContain(false);
    });

    it('saves the game', async () => {
      newHardGame();

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });

  describe('newEmptyGame', () => {
    it('creates a new empty game', async () => {
      let totalValues = 0;

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        totalValues = state.board.cells.filter((c) => c.value != null).length;
      });

      newEmptyGame();

      await waitFor(() => expect(totalValues).toEqual(0));
    });

    it('saves the game', async () => {
      newEmptyGame();

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });

  describe('undoOne', () => {
    let lastValue: number | null = null;

    beforeEach(async () => {
      lastValue = null;

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        lastValue = state.board.cells[1].value;
      });

      service.setCellValue(state.board, 1, 3);
      service.setCellValue(state.board, 1, 4);
    });

    it('undoes the last move', async () => {
      undoOne();

      await waitFor(() => expect(lastValue).toEqual(3));
    });

    it('skips the action if the game has finished', () => {
      state.board.finished = true;

      undoOne();

      expect(lastValue).toBeNull();
    });

    it('saves the game', async () => {
      undoOne();

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });

  describe('undoColor', () => {
    let updateCalled = false;

    beforeEach(() => {
      service.setCellValue(state.board, 2, 5);
      service.changeColor(state.board);
      service.setCellValue(state.board, 1, 3);
      service.setCellValue(state.board, 1, 4);

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        updateCalled = true;
      });
    });

    it('undoes the current color', async () => {
      undoColor();

      await waitFor(() => expect(updateCalled).toBeTruthy());
      expect(state.board.cells[2].value).toEqual(5);
      expect(state.board.cells[1].value).toBeNull();
    });

    it('skips the action if the game has finished', () => {
      state.board.finished = true;

      undoColor();

      expect(state.board.cells[1].value).toEqual(4);
    });

    it('saves the game', async () => {
      undoColor();

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });

  describe('solve', () => {
    it('solves the game', async () => {
      let finished = false;
      const loadingStates: boolean[] = [];

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        finished = state.board.finished;
      });

      window.addEventListener(SET_GAME_LOADING_ACTION, () => {
        loadingStates.push(state.loading);
      });

      solve();

      await waitFor(() => expect(finished).toBeTruthy());
      expect(loadingStates).toContain(false);
    });

    it('saves the game', async () => {
      solve();

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });

  describe('changeColor', () => {
    it('changes the color in the current board', async () => {
      let currentColor = 0;

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        currentColor = state.board.currentColor;
      });

      changeColor();

      await waitFor(() => expect(currentColor).toEqual(1));
    });

    it('saves the game', async () => {
      changeColor();

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });

  describe('updateCell', () => {
    it('updates a cell', async () => {
      let value: number | null = null;

      window.addEventListener(UPDATE_BOARD_ACTION, () => {
        value = state.board.cells[1].value;
      });

      updateCell(1, 2);

      await waitFor(() => expect(value).toEqual(2));
    });

    it('saves the game', async () => {
      updateCell(1, 2);

      await waitFor(() => {
        expect(loadBoard()).toEqual(state.board);
      });
    });
  });
});
