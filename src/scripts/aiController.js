export const aiFactory = (winChecker) => {
  const getMove = (board, player, oponent) => {
    const COLS = board[0].length;
    console.log(COLS);

    //Helper:check if move is valid
    const isValidMove = (col) => {
      return board[0][col] === null;
    };

    //Helper:clone + simulate
    const simulateMove = (board, col, player) => {
      const newBoard = board.map((row) => [...row]);
      for (let row = newBoard.length - 1; row >= 0; row--) {
        if (newBoard[row][col] === null) {
          newBoard[row][col] = player;
          break;
        }
      }
      return newBoard;
    };

    // 1. try to win
    for (let col = 0; col < COLS; col++) {
      if (isValidMove(col)) {
        const tempBoard = simulateMove(board, col, player);
        if (winChecker({ getState: () => tempBoard }).checkWin(player)) {
          return col;
        }
      }
    }

    //2. Block oponent
    for (let col = 0; col < COLS; col++) {
      if (isValidMove(col)) {
        const tempBoard = simulateMove(board, col, oponent);
        if (winChecker({ getState: () => tempBoard }).checkWin(oponent)) {
          return col;
        }
      }
    }

    //3. prefer the center
    const center = Math.floor(COLS / 2);

    if (isValidMove(center)) {
      return center;
    }

    //4. Heuristic (closer to the center is better)
    let bestScore = -Infinity;
    let bestCol = null;

    for (let col = 0; col < COLS; col++) {
      if (isValidMove(col)) {
        let score = 3 - Math.abs(center - col);
        if (score > bestScore) {
          bestScore = score;
          bestCol = col;
        }
      }
      return bestCol;
    }
  };

  return { getMove };
};
