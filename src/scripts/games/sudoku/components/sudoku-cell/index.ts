import { state, updateCell } from '../../stores/game/actions';
import {
  SET_GAME_LOADING_ACTION,
  UPDATE_BOARD_ACTION,
} from '../../stores/game/constants';
import styles from './styles.module.scss';

class SudokuCell extends HTMLElement {
  private row = 0;
  private col = 0;
  private index = 0;
  private button: HTMLButtonElement = document.createElement('button');
  private dropdown: HTMLElement = document.createElement('div');
  private hasClickedButton = false;

  private update = () => {
    this.button.classList.toggle(
      styles.initial,
      state.board.cells[this.index].initial,
    );
    this.button.classList.toggle(styles.finished, state.board.finished);
    this.button.classList.toggle(
      styles.error,
      state.board.cells[this.index].hasError,
    );
    this.button.ariaLabel = this.getButtonLabel();
    this.button.ariaInvalid = state.board.cells[this.index].hasError
      ? 'true'
      : 'false';
    this.button.innerHTML =
      state.board.cells[this.index].value?.toString() ?? '';
    this.button.setAttribute(
      'data-color',
      state.board.cells[this.index].color.toString(),
    );

    if (this.button.ariaExpanded === 'true') {
      this.dropdown.innerHTML = '';
    }

    if (state.board.cells[this.index].initial || state.board.finished) {
      this.button.ariaExpanded = null;
      this.button.ariaHasPopup = null;
      this.button.removeAttribute('aria-controls');
    } else {
      this.button.ariaExpanded = 'false';
      this.button.ariaHasPopup = 'true';
      this.button.setAttribute('aria-controls', this.dropdown.id);
    }
  };

  private onButtonClick = () => {
    if (
      this.button.ariaDisabled === 'true' ||
      this.button.ariaExpanded !== 'false'
    ) {
      return;
    }

    this.hasClickedButton = true;
    this.dropdown.innerHTML = '';

    [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((value) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.role = 'option';
      option.ariaSelected =
        state.board.cells[this.index].value === value ? 'true' : 'false';
      option.innerHTML = value === null ? '-' : value.toString();

      this.dropdown.appendChild(option);
    });

    this.button.ariaExpanded = 'true';
  };

  private onDocumentClick = () => {
    if (this.hasClickedButton) {
      this.hasClickedButton = false;
    } else if (this.button.ariaExpanded === 'true') {
      this.update();
    }
  };

  private onDropdownClick = (e: MouseEvent) => {
    const option = e.target as HTMLButtonElement;
    if (option?.role !== 'option' || option.ariaDisabled === 'true') {
      return;
    }

    const newValue = option.innerHTML === '-' ? null : Number(option.innerHTML);
    updateCell(this.index, newValue);
    this.button.focus();
  };

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.button.ariaExpanded === 'true') {
      this.update();
      this.button.focus();
    }
  };

  private setLoading = async () => {
    this.button.ariaDisabled = state.loading ? 'true' : 'false';
  };

  private getButtonLabel = () => {
    const value = state.board.cells[this.index].value;
    const selectionText =
      value == null ? 'No number selected.' : `${value} is selected.`;
    const rowText = `Sudoku cell row ${this.row + 1} and column ${
      this.col + 1
    }. ${selectionText}`;

    if (state.board.cells[this.index].initial) {
      return `${rowText} The number cannot be changed.`;
    }

    return `${rowText} Click to select a number.`;
  };

  private initButton = () => {
    this.button.id = `sudoku-cell-${this.row}-${this.col}`;
    this.button.type = 'button';
    this.button.ariaDisabled = 'false';

    this.appendChild(this.button);
  };

  private initDropdown = () => {
    this.dropdown.id = `sudoku-cell-dropdown-${this.row}-${this.col}`;
    this.dropdown.role = 'listbox';
    this.dropdown.ariaLabel = 'Cell options';
    this.dropdown.classList.toggle(styles.right, this.col > 4);
    this.dropdown.classList.toggle(styles.top, this.row > 5);

    this.appendChild(this.dropdown);
  };

  connectedCallback() {
    this.classList.add(styles.cell);

    this.row = Number(this.getAttribute('row'));
    this.col = Number(this.getAttribute('col'));
    this.index = this.row * 9 + this.col;

    this.initButton();
    this.initDropdown();

    this.update();

    window.addEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    window.addEventListener(UPDATE_BOARD_ACTION, this.update);
    this.button.addEventListener('click', this.onButtonClick);
    document.addEventListener('click', this.onDocumentClick);
    this.dropdown.addEventListener('click', this.onDropdownClick);
    document.addEventListener('keydown', this.onKeyDown);
  }

  disconnectedCallback() {
    window.removeEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    window.removeEventListener(UPDATE_BOARD_ACTION, this.update);
    this.button.removeEventListener('click', this.onButtonClick);
    document.removeEventListener('click', this.onDocumentClick);
    this.dropdown.removeEventListener('click', this.onDropdownClick);
    document.removeEventListener('keydown', this.onKeyDown);
  }
}

export default SudokuCell;
