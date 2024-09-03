import { beforeEach, describe, expect, it } from 'vitest';
import SudokuBoard from '.';
import { state } from '../../stores/game/actions';
import { createBoard } from '../../lib/sudoku/service';
import { Difficulty } from '../../lib/sudoku/models';
import { UPDATE_BOARD_ACTION } from '../../stores/game/constants';

customElements.define('app-sudoku-board', SudokuBoard);

describe('SudokuBoard', () => {
  beforeEach(() => {
    state.board = createBoard(Difficulty.EMPTY);

    document.body.innerHTML = '<app-sudoku-board />';
  });

  it('renders all cells', () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        expect(document.querySelector(`[row="${i}"][col="${j}"]`)).toBeTruthy();
      }
    }
  });

  it('is indicated as finished if the game has finished', () => {
    state.board.finished = true;

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(document.getElementsByClassName('finished').length).toEqual(1);
  });
});
