import '../../base';
import ActionButton from './components/action-button';
import SudokuBoard from './components/sudoku-board';
import SudokuCell from './components/sudoku-cell';
import ThemeSwitch from './components/theme-switch';
import { initGame } from './stores/game/actions';
import '../../../styles/games/sudoku/main.scss';
import ArrowLeftIcon from 'feather-icons/dist/icons/arrow-left.svg?raw';

const icons: { [i: string]: string } = {
  'arrow-left': ArrowLeftIcon,
};

const setIcons = () => {
  Array.from(document.querySelectorAll('[data-icon]')).forEach((el) => {
    const icon = icons[el.getAttribute('data-icon') ?? ''];
    el.innerHTML = `${icon}${el.innerHTML}`;
  });
};

// Initialize components
customElements.define('app-theme-switch', ThemeSwitch);
customElements.define('app-action-button', ActionButton);
customElements.define('app-sudoku-board', SudokuBoard);
customElements.define('app-sudoku-cell', SudokuCell);

// Initialize game
initGame();
setIcons();

// Remove curtain
setTimeout(() => {
  document.body.classList.remove('curtain');
}, 0);
