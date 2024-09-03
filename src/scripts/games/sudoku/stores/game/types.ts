import type { Board } from '../../lib/sudoku/models';

export interface GameState {
  board: Board;
  loading: boolean;
  initialized: boolean;
}
