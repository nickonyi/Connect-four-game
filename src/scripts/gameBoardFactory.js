import { timeController } from "./timeController";
import { winChecker } from "./winController";
import { boardFactory } from "./boardFactory";

export function gameBoardFactory(
  container,
  marker,
  piecesContainer,
  piecesAsset,
  mode
) {
  const ROWS = 6;
  const COLS = 7;
  let currentPlayer = "P1";
  const rowYMultipliers = [0.08, 0.22, 0.36, 0.5, 0.63, 0.78];
  let scores = { P1: 0, P2: 0 };
  const board = boardFactory(6, 7);
  const { checkWin } = winChecker(board);
  const gameBoard = board.getState();

  //timer function
  const turnTimer = timeController(
    30,
    () => {
      const oponent = currentPlayer === "P1" ? "P2" : "P1";
      declareWinner(oponent);
    },
    (timeLeft) => {
      document.getElementById("play-timer").textContent = `${timeLeft}s`;
    }
  );

  const startTimer = () => {
    turnTimer.start();
  };

  const stopTimer = () => {
    turnTimer.stop();
  };

  const init = () => {
    const zones = document.querySelectorAll(".click-zone");
    zones.forEach((zone) => {
      const col = parseInt(zone.dataset.col, 10);
      zone.addEventListener("mouseenter", () => moveMarker(col));
      zone.addEventListener("click", () => handleColumnClick(col));
    });

    startTimer();
  };

  const declareWinner = (winner) => {
    alert(winner + "is the winner");
  };

  const moveMarker = (col) => {
    const colWidth = container.clientWidth / COLS;
    const markerWidth = marker.clientWidth;
    marker.style.left = `${
      col * colWidth + (colWidth / 2 - markerWidth / 2)
    }px`;
  };

  const handleColumnClick = (col) => {
    const dropRow = findAvailableRow(col);
    if (dropRow === null) return;
    gameBoard[dropRow][col] = currentPlayer;
    drawPiece(dropRow, col, currentPlayer);

    if (checkWin(currentPlayer)) {
      stopTimer();
      declareWinner(currentPlayer);
      return;
    }

    if (mode === "pvc" && currentPlayer === "P1") {
      currentPlayer = "cpu";
      cpuMove();
    } else {
      switchPlayer();
    }
  };

  const findAvailableRow = (col) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (gameBoard[row][col] === null) return row;
    }
    return null;
  };

  const cpuMove = () => {
    let col;
    do {
      col = Math.floor(Math.random() * COLS);
    } while (findAvailableRow(col) === null);
    {
      setTimeout(() => {
        handleColumnClick(col);
      }, 500);
    }
  };

  const switchPlayer = () => {
    if (mode === "pvp") {
      currentPlayer = currentPlayer === "P1" ? "P2" : "P1";
    } else if (mode === "pvc") {
      currentPlayer = currentPlayer === "cpu" ? "P1" : "cpu";
    }

    marker.querySelector("img").src =
      currentPlayer === "P1" ? piecesAsset.markerP1 : piecesAsset.markerP2;
    document.getElementById("player-turn-text").textContent =
      currentPlayer === "P1" ? `Player 1's turn` : "Player 2's turn";
    startTimer();
  };

  const drawPiece = (row, col, player) => {
    const rect = container.getBoundingClientRect();
    const colWidth = rect.width / COLS;
    const pieceSize = colWidth * 0.94;

    const centerX = col * colWidth + colWidth / 2;
    const centerY = rowYMultipliers[row] * rect.height;

    const left = centerX - pieceSize / 2;
    const finalTop = centerY - pieceSize / 2;

    const piece = document.createElement("img");
    piece.src = player === "P1" ? piecesAsset.p1 : piecesAsset.p2;
    piece.classList.add("piece");
    piece.style.position = "absolute";
    piece.style.width = `${pieceSize}px`;
    piece.style.height = `${pieceSize}px`;
    piece.style.left = `${left}px`;

    // Start above the board
    piece.style.top = `-${pieceSize}px`;

    piecesContainer.appendChild(piece);

    // Force reflow so the browser registers the start position
    piece.offsetHeight;

    // Animate to final position
    piece.style.top = `${finalTop}px`;
  };

  const clearBoardUI = () => {
    document.querySelectorAll(".piece").forEach((piece) => piece.remove());
  };

  const clearBoardState = () => {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        board[r][c] = null;
      }
    }
    currentPlayer = "P1";
    marker.querySelector("img").src = piecesAsset.markerP1;
    document.getElementById("player-turn-text").textContent = "Player 1's turn";
  };

  const resetBoard = (shouldStartTimer = false) => {
    stopTimer();
    clearBoardUI();
    clearBoardState();

    if (shouldStartTimer) {
      startTimer();
    }
  };

  return {
    init,
    resetBoard,
  };
}
