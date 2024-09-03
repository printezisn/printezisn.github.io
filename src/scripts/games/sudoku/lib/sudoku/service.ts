import { shuffle } from '../helpers/array-helpers';
import { ActionType, Difficulty, type Action, type Board } from './models';

const COLOR_LIMIT = 5;

const VISIBLE_CELLS_PER_DIFFICULTY = {
  [Difficulty.EASY]: 40,
  [Difficulty.NORMAL]: 35,
  [Difficulty.HARD]: 30,
  [Difficulty.EMPTY]: 0,
};

export const cloneBoard = (board: Board): Board => ({
  ...board,
  actions: board.actions.map((action) => ({ ...action })),
  cells: board.cells.map((cell) => ({
    ...cell,
    options: new Set(cell.options),
  })),
});

export const analyzeBoard = (board: Board) => {
  const valuesPerRow = Array(9)
    .fill(null)
    .map(() => Array(10).fill(0));
  const valuesPerCol = Array(9)
    .fill(null)
    .map(() => Array(10).fill(0));
  const valuesPerGroup = Array(9)
    .fill(null)
    .map(() => Array(10).fill(0));

  board.finished = true;

  for (let i = 0; i < board.cells.length; i++) {
    const value = board.cells[i].value;
    if (!value) continue;

    const row = Math.floor(i / 9);
    const col = i % 9;
    const group = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    valuesPerRow[row][value]++;
    valuesPerCol[col][value]++;
    valuesPerGroup[group][value]++;
  }

  for (let i = 0; i < board.cells.length; i++) {
    const cell = board.cells[i];
    const value = cell.value;

    const row = Math.floor(i / 9);
    const col = i % 9;
    const group = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    cell.options.clear();
    for (let option = 1; option <= 9; option++) {
      const limit = value === option ? 2 : 1;
      const available =
        valuesPerRow[row][option] < limit &&
        valuesPerCol[col][option] < limit &&
        valuesPerGroup[group][option] < limit;
      if (available) {
        cell.options.add(option);
      }
    }

    cell.hasError = value != null && !cell.options.has(value);
    if (cell.hasError || value == null) {
      board.finished = false;
    }
  }
};

export const changeColor = (board: Board) => {
  const newColor = (board.currentColor + 1) % COLOR_LIMIT;

  board.actions.push({
    cellIndex: null,
    from: board.currentColor,
    to: newColor,
    type: ActionType.COLOR_CHANGE,
  });
  board.currentColor = newColor;
};

export const setCellValue = (
  board: Board,
  cellIndex: number,
  value: number | null,
) => {
  board.actions.push({
    cellIndex,
    from: board.cells[cellIndex].value,
    to: value,
    type: ActionType.CELL_CHANGE,
  });
  board.cells[cellIndex].value = value;
  board.cells[cellIndex].color = board.currentColor;

  analyzeBoard(board);
};

const undoAction = (board: Board, action: Action) => {
  let analyze = false;

  switch (action.type) {
    case ActionType.COLOR_CHANGE:
      board.currentColor = action.from as number;
      break;
    case ActionType.CELL_CHANGE:
      board.cells[action.cellIndex as number].value = action.from as
        | number
        | null;
      analyze = true;
      break;
  }

  return analyze;
};

export const undoSingle = (board: Board) => {
  const action = board.actions.pop();
  if (action && undoAction(board, action)) {
    analyzeBoard(board);
  }
};

export const undoColor = (board: Board) => {
  let analyze = false;

  while (board.actions.length > 0) {
    const action = board.actions.pop() as Action;
    analyze = undoAction(board, action) || analyze;

    if (action.type === ActionType.COLOR_CHANGE) {
      break;
    }
  }

  if (analyze) {
    analyzeBoard(board);
  }
};

export const solveBoard = (board: Board): Board | null => {
  let index = -1;

  for (let i = 0; i < board.cells.length; i++) {
    const cell = board.cells[i];
    if (cell.value != null) continue;

    if (index === -1 || cell.options.size < board.cells[index].options.size) {
      index = i;
    }
  }

  if (index === -1) {
    analyzeBoard(board);
    return board;
  }

  const options = shuffle(Array.from(board.cells[index].options));

  for (let i = 0; i < options.length; i++) {
    const rowStart = Math.floor(index / 9) * 9;
    const col = index % 9;
    const groupStart = Math.floor(index / 27) * 27 + Math.floor(col / 3) * 3;
    const clone = cloneBoard(board);
    let valid = true;

    clone.cells[index].value = options[i];
    clone.cells[index].color = clone.currentColor;

    for (let j = col; j < 81 + col && valid; j += 9) {
      if (j === index) continue;

      clone.cells[j].options.delete(options[i]);
      if (clone.cells[j].options.size === 0) {
        valid = false;
      }
    }

    for (let j = rowStart; j < rowStart + 9 && valid; j++) {
      if (j === index) continue;

      clone.cells[j].options.delete(options[i]);
      if (clone.cells[j].options.size === 0) {
        valid = false;
      }
    }

    for (let k = groupStart; k < 27 + groupStart && valid; k += 9) {
      for (let j = k; j < k + 3; j++) {
        if (j === index) continue;

        clone.cells[j].options.delete(options[i]);
        if (clone.cells[j].options.size === 0) {
          valid = false;
          break;
        }
      }
    }

    if (!valid) continue;

    const result = solveBoard(clone);
    if (result) return result;
  }

  return null;
};

export const createBoard = (difficulty: Difficulty): Board => {
  const board: Board = {
    cells: Array(81)
      .fill(null)
      .map(() => ({
        value: null,
        color: 0,
        hasError: false,
        initial: false,
        options: new Set(),
      })),
    finished: false,
    actions: [],
    currentColor: 0,
  };

  analyzeBoard(board);

  if (VISIBLE_CELLS_PER_DIFFICULTY[difficulty] === 0) {
    return board;
  }

  const solvedBoard = solveBoard(board) as Board;
  const shuffledCells = shuffle(solvedBoard.cells);

  for (let i = 0; i < shuffledCells.length; i++) {
    if (i < VISIBLE_CELLS_PER_DIFFICULTY[difficulty]) {
      shuffledCells[i].initial = true;
      shuffledCells[i].color = solvedBoard.currentColor;
    } else {
      shuffledCells[i].value = null;
    }
  }

  analyzeBoard(solvedBoard);

  return solvedBoard;
};
