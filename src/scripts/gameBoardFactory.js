import { TimeController } from "./timeController";
import { winChecker } from "./winController";
import { boardFactory } from "./boardFactory";
import { aiFactory } from "./aiController";

export function gameBoardFactory(
  container,
  marker,
  piecesContainer,
  piecesAsset,
  mode
) {
  const ROWS = 6;
  const COLS = 7;
  let startingPlayer = "P1";
  let currentPlayer = startingPlayer;
  const rowYMultipliers = [0.08, 0.22, 0.36, 0.5, 0.63, 0.78];
  let scores = { P1: 0, P2: 0 };
  const board = boardFactory(6, 7);
  let checkWin = winChecker(board).checkWin;
  let gameBoard = board.getState();
  const AI = aiFactory(winChecker);

  //timer function
  const turnTimer = TimeController(
    30,
    () => {
      const oponent = currentPlayer === "P1" ? "P2" : "P1";
      declareWinner(oponent);
      updateScores(oponent);
      document.getElementById("play-timer").textContent = `30s`;
    },
    (timeLeft) => {
      document.getElementById("play-timer").textContent = `${timeLeft}s`;
    }
  );

  const startTime = () => {
    turnTimer.start();
  };

  const stopTime = () => {
    turnTimer.stop();
  };

  const pauseTime = () => {
    turnTimer.pause();
  };

  const resumeTime = () => {
    turnTimer.resume();
  };

  const updateMarkers = () => {
    const turnContainer = document.querySelector(".turn-background-container");
    if (mode === "pvp") {
      marker.querySelector("img").src =
        currentPlayer === "P1" ? piecesAsset.markerP1 : piecesAsset.markerP2;
      document.getElementById("player-turn-text").textContent =
        currentPlayer === "P1" ? `Player 1's turn` : "Player 2's turn";

      turnContainer.querySelector("img").src =
        currentPlayer === "P2" ? piecesAsset.imgYellow : piecesAsset.imgRed;
    } else if (mode === "pvc") {
      marker.querySelector("img").src =
        currentPlayer === "P1" ? piecesAsset.markerP1 : piecesAsset.markerP2;
      document.getElementById("player-turn-text").textContent =
        currentPlayer === "P1" ? `Your turn` : "Cpu's turn";

      turnContainer.querySelector("img").src =
        currentPlayer === "cpu" ? piecesAsset.imgYellow : piecesAsset.imgRed;
    }

    // update background + text color via CSS classes
    turnContainer
      .querySelector(".text-overlay")
      .classList.remove("pink", "yellow");
    if (currentPlayer === "P1") {
      turnContainer.querySelector(".text-overlay").classList.add("pink");
    } else {
      turnContainer.querySelector(".text-overlay").classList.add("yellow");
    }
  };

  const init = () => {
    const zones = document.querySelectorAll(".click-zone");
    zones.forEach((zone) => {
      const col = parseInt(zone.dataset.col, 10);

      // first clear old listeners
      zone.replaceWith(zone.cloneNode(true));
    });

    document.querySelectorAll(".click-zone").forEach((zone) => {
      const col = parseInt(zone.dataset.col, 10);
      zone.addEventListener("mouseenter", () => moveMarker(col));
      zone.addEventListener("click", () => handleColumnClick(col));
    });

    startTime();
  };

  const updateScoresinUi = () => {
    document.getElementById("score-p1").textContent = scores.P1;
    document.getElementById("score-p2").textContent = scores.P2;
  };
  const updateScores = (winner) => {
    if (winner === "P1") {
      scores.P1 += 1;
    } else {
      scores.P2 += 1;
    }
    updateScoresinUi();
  };

  const removeWinMessage = () => {
    const winningBoard = document.querySelector(".winning-board");
    document
      .querySelector(".turn-background-container")
      .classList.remove("hide");
    if (winningBoard) {
      winningBoard.classList.add("hide");
    }

    container.classList.remove("disable");
  };

  const startNewRound = () => {
    clearBoardUI();
    clearBoardState();
    startTime();
    if (mode === "pvp") {
      startingPlayer = startingPlayer === "P1" ? "P2" : "P1";
      currentPlayer = startingPlayer;
    } else if (mode === "pvc") {
      startingPlayer = startingPlayer === "P1" ? "cpu" : "P1";
      console.log(startingPlayer);

      currentPlayer = startingPlayer;
    }
    updateMarkers();
    if (currentPlayer === "cpu") {
      cpuMove();
    }
  };

  const declareWinner = (winner) => {
    const old = document.querySelector(".winning-board");
    if (old) old.remove();

    const winningBoardCont = document.getElementById("winning-board-container");
    const turnContainer = document.querySelector(".turn-background-container");

    container.classList.add("disable");

    const winningBoard = document.createElement("div");
    winningBoard.classList.add("winning-board", "box-shadow-black");

    const playerWinner = document.createElement("p");
    playerWinner.classList.add("player-winner");
    playerWinner.textContent =
      winner === "P1" && mode === "pvp"
        ? "Player 1"
        : winner === "P2"
        ? "Player 2"
        : winner === "cpu"
        ? "CPU"
        : "You";

    const winnerMessage = document.createElement("p");
    winnerMessage.classList.add("winner-message");
    winnerMessage.textContent =
      winner === "P1" && mode === "pvc" ? "win" : "wins";

    const resetBtn = document.createElement("button");
    resetBtn.classList.add("reset-btn");
    resetBtn.textContent = "Play Again";
    resetBtn.addEventListener("click", () => {
      turnContainer.classList.remove("hide");
      winningBoard.classList.add("hide");
      startNewRound();

      container.classList.remove("disable");
    });

    winningBoard.append(playerWinner, winnerMessage, resetBtn);
    turnContainer.classList.add("hide");
    winningBoardCont.appendChild(winningBoard);
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
      stopTime();
      updateScores(currentPlayer);
      declareWinner(currentPlayer);
      return;
    }

    switchPlayer();
    if (mode === "pvc" && currentPlayer === "cpu") {
      cpuMove();
    }
  };

  const findAvailableRow = (col) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (gameBoard[row][col] === null) return row;
    }
    return null;
  };

  const cpuMove = () => {
    const col = AI.getMove(gameBoard, "cpu", "P1");
    console.log(col);

    setTimeout(() => handleColumnClick(col), 500);
  };

  const switchPlayer = () => {
    if (mode === "pvp") {
      currentPlayer = currentPlayer === "P1" ? "P2" : "P1";
    } else if (mode === "pvc") {
      currentPlayer = currentPlayer === "cpu" ? "P1" : "cpu";
    }
    updateMarkers();
    startTime();
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
    board.clear();
    gameBoard = board.getState();
    checkWin = winChecker(board).checkWin;
    currentPlayer = "P1";
    marker.querySelector("img").src = piecesAsset.markerP1;
    document.getElementById("player-turn-text").textContent = "Player 1's turn";
  };

  const resetScores = () => {
    scores = { P1: 0, P2: 0 };
    updateScoresinUi();
  };

  const resetBoard = (shouldStartTimer = false) => {
    stopTime();
    clearBoardUI();
    clearBoardState();
    resetScores();
    removeWinMessage();

    if (shouldStartTimer) {
      startTime();
    }
  };

  return {
    init,
    resetBoard,
    pauseTime,
    resumeTime,
    stopTime,
  };
}
