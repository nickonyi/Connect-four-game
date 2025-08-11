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
    });
  };

  const moveMarker = (col) => {
    const colWidth = container.clientWidth / COLS;
    const markerWidth = marker.clientWidth;
    marker.style.left = `${
      col * colWidth + (colWidth / 2 - markerWidth / 2)
    }px`;
  };

  return {
    init,
  };
}
