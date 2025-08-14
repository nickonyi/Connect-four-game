export const winChecker = (board) => {
  const rows = board.length;
  const cols = board[0].length;

  const checkWin = (player) => {
    // Horizontal
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c <= cols - 4; c++) {
        if (
          board[r][c] === player &&
          board[r][c + 1] === player &&
          board[r][c + 2] === player &&
          board[r][c + 3] === player
        )
          return true;
      }
    }

    // Vertical
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r <= rows - 4; r++) {
        if (
          board[r][c] === player &&
          board[r + 1][c] === player &&
          board[r + 2][c] === player &&
          board[r + 3][c] === player
        )
          return true;
      }
    }

    // Diagonal down-right
    for (let r = 0; r <= rows - 4; r++) {
      for (let c = 0; c <= cols - 4; c++) {
        if (
          board[r][c] === player &&
          board[r + 1][c + 1] === player &&
          board[r + 2][c + 2] === player &&
          board[r + 3][c + 3] === player
        )
          return true;
      }
    }

    // Diagonal down-left
    for (let r = 0; r <= rows - 4; r++) {
      for (let c = 3; c < cols; c++) {
        if (
          board[r][c] === player &&
          board[r + 1][c - 1] === player &&
          board[r + 2][c - 2] === player &&
          board[r + 3][c - 3] === player
        )
          return true;
      }
    }

    return false;
  };

  return { checkWin };
};
