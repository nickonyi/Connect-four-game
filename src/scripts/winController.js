export const winChecker = (board) => {
  const gameBoard = board.getState();
  const rows = gameBoard.length;
  const cols = gameBoard[0].length;

  const checkWin = (player) => {
    // Horizontal
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c <= cols - 4; c++) {
        if (
          gameBoard[r][c] === player &&
          gameBoard[r][c + 1] === player &&
          gameBoard[r][c + 2] === player &&
          gameBoard[r][c + 3] === player
        ) {
          return [
            { r, c },
            { r, c: c + 1 },
            { r, c: c + 2 },
            { r, c: c + 3 },
          ];
        }
      }
    }

    // Vertical
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r <= rows - 4; r++) {
        if (
          gameBoard[r][c] === player &&
          gameBoard[r + 1][c] === player &&
          gameBoard[r + 2][c] === player &&
          gameBoard[r + 3][c] === player
        ) {
          return [
            { r, c },
            { r: r + 1, c },
            { r: r + 2, c },
            { r: r + 3, c },
          ];
        }
      }
    }

    // Diagonal down-right
    for (let r = 0; r <= rows - 4; r++) {
      for (let c = 0; c <= cols - 4; c++) {
        if (
          gameBoard[r][c] === player &&
          gameBoard[r + 1][c + 1] === player &&
          gameBoard[r + 2][c + 2] === player &&
          gameBoard[r + 3][c + 3] === player
        ) {
          return [
            { r, c },
            { r: r + 1, c: c + 1 },
            { r: r + 2, c: c + 2 },
            { r: r + 3, c: c + 3 },
          ];
        }
      }
    }

    // Diagonal down-left
    for (let r = 0; r <= rows - 4; r++) {
      for (let c = 3; c < cols; c++) {
        if (
          gameBoard[r][c] === player &&
          gameBoard[r + 1][c - 1] === player &&
          gameBoard[r + 2][c - 2] === player &&
          gameBoard[r + 3][c - 3] === player
        ) {
          return [
            { r, c },
            { r: r + 1, c: c - 1 },
            { r: r + 2, c: c - 2 },
            { r: r + 3, c: c - 3 },
          ];
        }
      }
    }

    return null; // no win
  };

  return { checkWin };
};
