import * as actions from '../../stores/game/actions';
import DownIcon from 'feather-icons/dist/icons/chevron-down.svg?raw';
import RotateArrowIcon from 'feather-icons/dist/icons/rotate-ccw.svg?raw';
import PlusIcon from 'feather-icons/dist/icons/plus.svg?raw';
import CheckIcon from 'feather-icons/dist/icons/check.svg?raw';
import {
  SET_GAME_LOADING_ACTION,
  UPDATE_BOARD_ACTION,
} from '../../stores/game/constants';
import styles from './styles.module.scss';

const sudokuActions = actions as unknown as { [a: string]: () => void };

const icons: { [i: string]: string } = {
  'rotate-arrow': RotateArrowIcon,
  plus: PlusIcon,
  check: CheckIcon,
  changeColor: `<span class="${styles.colorIcon}"></span>`,
};

class ActionButton extends HTMLElement {
  private menu: string = '';
  private action: string = '';
  private icon: string = '';
  private button: HTMLButtonElement = document.createElement('button');
  private hasClickedButton = false;

  private onButtonClick = () => {
    if (this.button.ariaDisabled === 'true') return;

    this.hasClickedButton = true;

    if (this.menu && this.button) {
      this.button.ariaExpanded =
        this.button.ariaExpanded === 'true' ? 'false' : 'true';
    }
    if (this.action) {
      sudokuActions[this.action]();
      document.getElementById('sudoku-cell-0-0')?.focus();
    }
  };

  private onDocumentClick = () => {
    if (this.hasClickedButton) {
      this.hasClickedButton = false;
    } else if (this.button) {
      this.button.ariaExpanded = 'false';
    }
  };

  private onDocumentKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.button.ariaExpanded === 'true') {
      this.button.ariaExpanded = 'false';
      this.button.focus();
    }
  };

  private setLoading = () => {
    if (actions.state.loading) {
      this.button.ariaDisabled = 'true';
      this.button.ariaExpanded = 'false';
    } else {
      this.button.ariaDisabled = 'false';
    }
  };

  private setColor = () => {
    this.button.setAttribute(
      'data-color',
      actions.state.board.currentColor.toString(),
    );
  };

  connectedCallback() {
    this.classList.add(styles.actionButton);

    this.action = this.getAttribute('action') ?? '';
    this.menu = this.getAttribute('menu') ?? '';
    this.icon = this.getAttribute('icon') ?? '';

    this.role = 'presentation';

    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.role = 'menuitem';
    this.button.ariaDisabled = 'false';
    this.button.setAttribute(
      'data-color',
      actions.state.board.currentColor.toString(),
    );
    this.button.classList.add('button');
    if (this.menu) {
      this.button.ariaHasPopup = 'true';
      this.button.setAttribute('aria-controls', this.menu);
      this.button.ariaExpanded = 'false';
    }

    window.addEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    window.addEventListener(UPDATE_BOARD_ACTION, this.setColor);
    this.button.addEventListener('click', this.onButtonClick);
    if (this.menu) {
      document.addEventListener('keydown', this.onDocumentKeyDown);
      document.addEventListener('click', this.onDocumentClick);
    }

    this.button.innerHTML = `${icons[this.icon] ?? ''}${this.innerHTML}${
      this.menu ? DownIcon : ''
    }`;

    this.replaceChildren(this.button);
  }

  disconnectedCallback() {
    window.removeEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    window.removeEventListener(UPDATE_BOARD_ACTION, this.setColor);
    this.button.removeEventListener('click', this.onButtonClick);
    if (this.menu) {
      document.removeEventListener('keydown', this.onDocumentKeyDown);
      document.removeEventListener('click', this.onDocumentClick);
    }
  }
}

export default ActionButton;
