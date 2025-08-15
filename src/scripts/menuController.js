import { gameBoardFactory } from "./gameBoardFactory";

export const MenuConroller = () => {
  const gameRulesBtn = document.querySelector("#game-rules-btn");
  const checkBtn = document.querySelector(".close-rules-btn");
  const menuBtn = document.querySelector(".game-info-menu");
  const continueBtn = document.getElementById("resume-btn");
  const restartBtn = document.getElementById("restart-btn");
  const quitBtn = document.getElementById("quit-btn");
  const marker = document.getElementById("player-indicator");
  const { resetBoard } = gameBoardFactory(marker);

  const toggleBoxes = () => {
    const box1 = document.querySelector(".main-menu-tab");
    const box2 = document.querySelector(".rules-section");

    if (box1.classList.contains("hidden")) {
      box1.classList.remove("hidden");
      box2.classList.add("hidden");
    } else {
      box1.classList.add("hidden");
      box2.classList.remove("hidden");
    }
  };

  const close = () => {
    document.querySelector(".modal").style.display = "none";
  };

  const bringMenu = () => {
    document.querySelector(".modal").style.display = "flex";
  };

  const restartGame = () => {
    resetBoard(true);
  };

  const returnToHomeScreen = () => {
    document.querySelector("#game-screen").classList.add("hidden");
    document.querySelector("#home-screen").classList.remove("hidden");
  };

  const quitGame = () => {
    close();
    resetBoard();
    returnToHomeScreen();
  };

  const bindEvents = () => {
    gameRulesBtn.addEventListener("click", toggleBoxes);
    menuBtn.addEventListener("click", bringMenu);
    checkBtn.addEventListener("click", toggleBoxes);
    continueBtn.addEventListener("click", close);
    restartBtn.addEventListener("click", restartGame);
    quitBtn.addEventListener("click", quitGame);
  };

  return {
    init: () => {
      bindEvents();
    },
  };
};
