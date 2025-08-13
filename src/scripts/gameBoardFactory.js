export function gameBoardFactory(
  container,
  marker,
  piecesContainer,
  piecesAsset
) {
  const ROWS = 6;
  const COLS = 7;
  const board = Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null));
  const currentPlayer = "P1";

  const init = () => {
    const zones = document.querySelectorAll(".click-zone");
    zones.forEach((zone) => {
      const col = parseInt(zone.dataset.col, 10);
      zone.addEventListener("mouseenter", () => moveMarker(col));
      zone.addEventListener("click", () => handleColumnClick(col));
    });
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
    board[dropRow][col] = currentPlayer;
    drawPiece(dropRow, col, currentPlayer);
  };

  const findAvailableRow = (col) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) return row;
    }
    return null;
  };

  const rowYMultipliers = [0.08, 0.22, 0.36, 0.5, 0.63, 0.78];

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

  return {
    init,
  };
}
