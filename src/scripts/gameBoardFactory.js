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
    console.log("Column clicked:", col);
    const dropRow = findAvailableRow(col);
    console.log("Drop row found:", dropRow);
    if (dropRow === null) return;
    board[dropRow][col] = currentPlayer;
    console.log(board);

    drawPiece(dropRow, col, currentPlayer);
  };

  const findAvailableRow = (col) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) return row;
    }
    return null;
  };

  const drawPiece = (row, col, player) => {
    const piece = document.createElement("img");
    piece.src = player === "P1" ? piecesAsset.p1 : piecesAsset.p2;
    piece.classList.add("piece");

    const colWidth = container.clientWidth / COLS;
    const rowHeight = container.clientHeight / ROWS;
    // shrink slightly so it fits inside hole
    const scale = container.clientWidth / 740; // ~0.5 for 370px
    const pieceDiameter = 80 * scale;

    // calculate centered position in hole
    const left = col * colWidth + (colWidth - pieceDiameter) / 2;
    const top = row * rowHeight + (rowHeight - pieceDiameter) / 2;

    piece.style.position = "absolute";
    piece.style.left = `${left}px`;
    piece.style.top = `${top}px`;
    piece.style.width = `${pieceDiameter}px`;
    piece.style.height = `${pieceDiameter}px`;

    piecesContainer.appendChild(piece);
  };
  return {
    init,
  };
}
