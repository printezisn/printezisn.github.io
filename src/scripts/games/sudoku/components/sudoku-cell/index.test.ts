import { beforeEach, describe, expect, it } from 'vitest';
import SudokuCell from '.';
import { state } from '../../stores/game/actions';
import * as service from '../../lib/sudoku/service';
import { Difficulty } from '../../lib/sudoku/models';
import {
  SET_GAME_LOADING_ACTION,
  UPDATE_BOARD_ACTION,
} from '../../stores/game/constants';

customElements.define('app-sudoku-cell', SudokuCell);

describe('sudoku cell', () => {
  let cellButton: HTMLButtonElement;
  let cellDropdown: HTMLElement;

  beforeEach(() => {
    state.board = service.createBoard(Difficulty.EMPTY);
    state.loading = false;
    state.initialized = true;
    localStorage.removeItem('board');

    document.body.innerHTML = '<app-sudoku-cell row="2" col="3" />';
    cellButton = document.querySelector(
      '[aria-label="Sudoku cell row 3 and column 4. No number selected. Click to select a number."]',
    ) as HTMLButtonElement;
    cellDropdown = document.getElementById(
      'sudoku-cell-dropdown-2-3',
    ) as HTMLElement;
  });

  it('renders a cell button', () => {
    expect(cellButton).toBeTruthy();
    expect(cellButton.value).toBeFalsy();
  });

  it('renders an options dropdown', () => {
    expect(cellDropdown).toBeTruthy();
    expect(cellDropdown.ariaLabel).toEqual('Cell options');
    expect(cellDropdown.role).toEqual('listbox');
    expect(cellDropdown.innerHTML).toBeFalsy();
  });

  it('renders regular cell', () => {
    state.board.cells[21].value = 5;

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(cellButton.innerHTML).toEqual('5');
    expect(cellButton.classList.contains('initial')).toBeFalsy();
    expect(cellButton.ariaInvalid).toEqual('false');
    expect(cellButton.getAttribute('aria-haspopup')).toEqual('true');
    expect(cellButton.getAttribute('aria-expanded')).toEqual('false');
    expect(cellButton.getAttribute('aria-controls')).toEqual(
      'sudoku-cell-dropdown-2-3',
    );
  });

  it('renders initial cell', () => {
    state.board.cells[21].value = 5;
    state.board.cells[21].initial = true;

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(cellButton.innerHTML).toEqual('5');
    expect(cellButton.classList.contains('initial')).toBeTruthy();
    expect(cellButton.ariaInvalid).toEqual('false');
    expect(cellButton.getAttribute('aria-haspopup')).toBeFalsy();
    expect(cellButton.getAttribute('aria-expanded')).toBeFalsy();
    expect(cellButton.getAttribute('aria-controls')).toBeFalsy();
  });

  it('is disabled if the state is loading', () => {
    state.loading = true;

    window.dispatchEvent(new CustomEvent(SET_GAME_LOADING_ACTION));

    expect(cellButton.ariaDisabled).toEqual('true');
  });

  it('is indicated as finished if the game has finished', () => {
    state.board.finished = true;

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(cellButton.classList.contains('finished')).toBeTruthy();
    expect(cellButton.getAttribute('aria-haspopup')).toBeFalsy();
    expect(cellButton.getAttribute('aria-expanded')).toBeFalsy();
    expect(cellButton.getAttribute('aria-controls')).toBeFalsy();
  });

  it('indicates if it has an error', () => {
    service.setCellValue(state.board, 20, 7);
    service.setCellValue(state.board, 21, 7);

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(cellButton.classList.contains('error')).toBeTruthy();
    expect(cellButton.ariaInvalid).toEqual('true');
  });

  it('changes label if a number is selected', () => {
    state.board.cells[21].value = 5;

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(cellButton.ariaLabel).toEqual(
      'Sudoku cell row 3 and column 4. 5 is selected. Click to select a number.',
    );
  });

  it('has a label that indicates that the number is locked if it is an initial cell', () => {
    state.board.cells[21].value = 5;
    state.board.cells[21].initial = true;

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(cellButton.ariaLabel).toEqual(
      'Sudoku cell row 3 and column 4. 5 is selected. The number cannot be changed.',
    );
  });

  it('shows the options dropdown, with all available options, when the button is clicked', () => {
    cellButton.click();

    expect(cellButton.ariaExpanded).toEqual('true');
    expect(
      Array.from(cellDropdown.querySelectorAll('button')).map(
        (b) => b.innerHTML,
      ),
    ).toEqual(['-', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  });

  it('hides the options dropdown if the user clicks anywhere else', () => {
    cellButton.click();

    expect(cellButton.ariaExpanded).toEqual('true');

    cellButton.click();

    expect(cellButton.ariaExpanded).toEqual('false');
  });

  it('sets the cell value if an option is selected', () => {
    cellButton.click();
    const option = cellDropdown.querySelector(
      'button:nth-child(6)',
    ) as HTMLButtonElement;

    option.click();

    expect(cellButton.innerHTML).toEqual('5');
    expect(cellButton.ariaExpanded).toEqual('false');
    expect(cellDropdown.innerHTML).toBeFalsy();
  });

  it('closes the options dropdown if the user presses escape', () => {
    cellButton.click();

    expect(cellButton.ariaExpanded).toEqual('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(cellButton.ariaExpanded).toEqual('false');
  });
});
