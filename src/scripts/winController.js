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
          console.log("hor win");
          return true;
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
          console.log("ver win");
          return true;
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
          console.log("diag down-right win");
          return true;
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
          console.log("diag down-left win");
          return true;
        }
      }
    }

    return false;
  };

  return { checkWin };
};
