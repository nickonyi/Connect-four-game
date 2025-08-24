export const boardFactory = (rows, cols) => {
  let state = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));

  const clear = () => {
    state = Array.from({ length: rows }, () => Array(cols).fill(null));
  };

  const isBoardFull = () => {
    return state.every((row) => row.every((cell) => cell !== null));
  };

  const getState = () => state;

  return { clear, getState, isBoardFull };
};
