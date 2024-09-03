import { beforeEach, describe, expect, it } from 'vitest';
import ActionButton from '.';
import { state } from '../../stores/game/actions';
import { createBoard } from '../../lib/sudoku/service';
import { Difficulty } from '../../lib/sudoku/models';
import {
  SET_GAME_LOADING_ACTION,
  UPDATE_BOARD_ACTION,
} from '../../stores/game/constants';

customElements.define('app-action-button', ActionButton);

describe('ActionButton', () => {
  beforeEach(() => {
    state.board = createBoard(Difficulty.EMPTY);
    state.loading = false;
  });

  describe('when it controls a menu', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      document.body.innerHTML = `
        <app-action-button menu="mymenu">Press</app-action-button>
        <span></span>
      `;

      button = document.querySelector('button') as HTMLButtonElement;
    });

    it('sets the appropriate accessibility attributes', () => {
      expect(button.getAttribute('aria-expanded')).toEqual('false');
      expect(button.getAttribute('aria-haspopup')).toEqual('true');
      expect(button.getAttribute('aria-controls')).toEqual('mymenu');
      expect(button.getAttribute('role')).toEqual('menuitem');
      expect(button.ariaDisabled).toEqual('false');
      expect(button.getAttribute('data-color')).toEqual('0');
      expect(button.innerHTML.startsWith('Press<svg')).toBeTruthy();
    });

    it('toggles aria-expanded on click', () => {
      button.click();

      expect(button.getAttribute('aria-expanded')).toEqual('true');
    });

    it('sets aria-expanded as false if the user clicks anywhere else', () => {
      button.click();
      expect(button.getAttribute('aria-expanded')).toEqual('true');

      document.querySelector('span')?.click();
      expect(button.getAttribute('aria-expanded')).toEqual('false');
    });

    it('sets button as loading if state is loading', () => {
      state.loading = true;

      window.dispatchEvent(new CustomEvent(SET_GAME_LOADING_ACTION));

      expect(button.ariaDisabled).toEqual('true');
    });

    it('does not run click actions if the button is disabled', () => {
      button.ariaDisabled = 'true';
      button.click();

      expect(button.getAttribute('aria-expanded')).toEqual('false');
    });

    it('displays an icon if it is provided', () => {
      document.body.innerHTML = `
        <app-action-button menu="mymenu" icon="check">Press</app-action-button>
        <span></span>
      `;

      button = document.querySelector('button') as HTMLButtonElement;

      expect(button.getElementsByClassName('feather-check').length).toEqual(1);
    });

    it('updates the indicated color when it changes', () => {
      state.board.currentColor = 1;

      window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

      expect(button.getAttribute('data-color')).toEqual('1');
    });

    it('closes the menu if the user clicks escape', () => {
      button.ariaExpanded = 'true';

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(button.ariaExpanded).toEqual('false');
    });
  });

  describe('when it does not control a menu', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      document.body.innerHTML =
        '<app-action-button action="changeColor">Press</app-action-button>';

      button = document.querySelector('button') as HTMLButtonElement;
    });

    it('sets the appropriate accessibility attributes', () => {
      expect(button.getAttribute('aria-expanded')).toBeFalsy();
      expect(button.getAttribute('aria-haspopup')).toBeFalsy();
      expect(button.getAttribute('aria-controls')).toBeFalsy();
      expect(button.getAttribute('role')).toEqual('menuitem');
      expect(button.ariaDisabled).toEqual('false');
      expect(button.innerHTML).toEqual('Press');
    });

    it('does not set aria-expanded on click', () => {
      button.click();

      expect(button.getAttribute('aria-expanded')).toBeFalsy();
    });

    it('runs its action on click', () => {
      button.click();

      expect(state.board.currentColor).toEqual(1);
    });
  });
});
