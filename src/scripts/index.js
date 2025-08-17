import "../styles/style.css";
import { MenuConroller } from "./menuController";
import { UIcontroller } from "./uiController";
import { gameBoardFactory } from "./gameBoardFactory";
import markerRed from "../assets/images/marker-red.svg";
import markerYellow from "../assets/images/marker-yellow.svg";
import imgRed from "../assets/images/turn-background-red.svg";
import imgYellow from "../assets/images/turn-background-yellow.svg";
import pieceRed from "../assets/images/counter-red-large.svg";
import pieceYellow from "../assets/images/counter-yellow-large.svg";

// Game elements
const boardContainer = document.querySelector(".player-board-container");
const marker = document.querySelector("#player-indicator");
const piecesContainer = document.querySelector("#pieces-container");

// Assets object
const pieceAssets = {
  markerP1: markerRed,
  markerP2: markerYellow,
  p1: pieceRed,
  p2: pieceYellow,
  imgRed: imgRed,
  imgYellow: imgYellow,
};

const App = (() => {
  let game;
  let menu;

  const startGame = (mode) => {
    game = gameBoardFactory(
      boardContainer,
      marker,
      piecesContainer,
      pieceAssets,
      mode
    );

    game.init();

    menu = MenuConroller(game);
    menu.bindGameEvents();
  };

  const ui = UIcontroller(startGame);
  menu = MenuConroller(game);

  const start = () => {
    ui.init();
    menu.init();
  };
  return { start };
})();

App.start();
