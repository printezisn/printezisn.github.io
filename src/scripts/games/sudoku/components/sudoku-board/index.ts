import { state } from '../../stores/game/actions';
import { UPDATE_BOARD_ACTION } from '../../stores/game/constants';
import styles from './styles.module.scss';

class SudokuBoard extends HTMLElement {
  private updateBoard = () => {
    this.classList.toggle(styles.finished, state.board.finished);
  };

  connectedCallback() {
    this.classList.add(styles.board);
    this.classList.toggle(styles.finished, state.board.finished);

    const inner = document.createElement('div');
    inner.classList.add(styles.inner);

    for (let i = 0; i < 9; i++) {
      const group = document.createElement('div');

      for (let j = 0; j < 9; j++) {
        const row = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        const col = (i % 3) * 3 + (j % 3);

        const cell = document.createElement('app-sudoku-cell');
        cell.setAttribute('row', row.toString());
        cell.setAttribute('col', col.toString());

        group.appendChild(cell);
      }

      inner.appendChild(group);
    }

    this.appendChild(inner);

    window.addEventListener(UPDATE_BOARD_ACTION, this.updateBoard);
  }

  disconnectedCallback() {
    window.removeEventListener(UPDATE_BOARD_ACTION, this.updateBoard);
  }
}

export default SudokuBoard;
