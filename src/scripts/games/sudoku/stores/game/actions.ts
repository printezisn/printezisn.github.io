import { debounce } from '../../lib/helpers/timing-helpers';
import {
  type Board,
  Difficulty,
  type WorkerMessage,
  WorkerMessageType,
} from '../../lib/sudoku/models';
import { loadBoard, saveBoard } from '../../lib/sudoku/repo';
import * as service from '../../lib/sudoku/service';
import Worker from '../../lib/sudoku/worker?worker';
import { SET_GAME_LOADING_ACTION, UPDATE_BOARD_ACTION } from './constants';
import type { GameState } from './types';

const worker = new Worker();
worker.onmessage = (e) => {
  const message = e.data as WorkerMessage;

  loadingDebounce.cancel();
  if (message.board) {
    updateBoard(message.board);
  }
};

const createState = (): GameState => {
  const savedBoard = loadBoard();

  return {
    board: savedBoard || service.createBoard(Difficulty.EMPTY),
    loading: false,
    initialized: Boolean(savedBoard),
  };
};

export const state = createState();

const loadingDebounce = debounce(
  () => {
    state.loading = true;
    window.dispatchEvent(new CustomEvent(SET_GAME_LOADING_ACTION));
  },
  () => {
    state.loading = false;
    window.dispatchEvent(new CustomEvent(SET_GAME_LOADING_ACTION));
  },
);

const updateBoard = (board: Board) => {
  state.board = board;
  saveBoard(state.board);
  window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));
};

const createGame = (difficulty: Difficulty) => {
  if (state.loading) return;

  loadingDebounce.start();

  worker.postMessage({
    type: WorkerMessageType.CREATE_NEW,
    difficulty: difficulty,
  } as WorkerMessage);
};

export const initGame = () => {
  if (!state.initialized) {
    createGame(Difficulty.EASY);
  }
};

export const newEasyGame = () => {
  createGame(Difficulty.EASY);
};

export const newNormalGame = () => {
  createGame(Difficulty.NORMAL);
};

export const newHardGame = () => {
  createGame(Difficulty.HARD);
};

export const newEmptyGame = () => {
  if (state.loading) return;

  updateBoard(service.createBoard(Difficulty.EMPTY));
};

export const undoOne = () => {
  if (state.loading || state.board.finished) return;

  service.undoSingle(state.board);
  updateBoard(state.board);
};

export const undoColor = () => {
  if (state.loading || state.board.finished) return;

  service.undoColor(state.board);
  updateBoard(state.board);
};

export const solve = () => {
  if (state.loading) return;

  loadingDebounce.start();

  worker.postMessage({
    type: WorkerMessageType.SOLVE,
    board: state.board,
  } as WorkerMessage);
};

export const changeColor = () => {
  if (state.loading) return;

  service.changeColor(state.board);
  updateBoard(state.board);
};

export const updateCell = (index: number, value: number | null) => {
  if (state.loading) return;

  service.setCellValue(state.board, index, value);
  updateBoard(state.board);
};
