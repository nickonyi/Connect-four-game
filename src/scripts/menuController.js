import { gameBoardFactory } from "./gameBoardFactory";

export const MenuConroller = (gameBoard) => {
  const gameRulesBtn = document.getElementById("game-rules-btn");

  const checkBtn = document.querySelector(".close-rules-btn");
  console.log(checkBtn);

  const menuBtn = document.querySelector(".game-info-menu");
  const continueBtn = document.getElementById("resume-btn");
  const restartBtns = document.querySelectorAll(".restart-btn");

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
  const resumeGame = () => {
    close();
    gameBoard.resumeTime();
  };

  const bringMenu = () => {
    document.querySelector(".modal").style.display = "flex";
    gameBoard.pauseTime();
  };

  const restartGame = () => {
    gameBoard.stopTime();
    gameBoard.resetBoard(true);
    close();
  };

  const returnToHomeScreen = () => {
    document.querySelector("#game-screen").classList.add("hidden");
    document.querySelector("#home-screen").classList.remove("hidden");
  };

  const quitGame = () => {
    close();
    gameBoard.resetBoard();
    returnToHomeScreen();
  };

  const bindGlobalEvents = () => {
    // events that should always work, even on the home screen
    gameRulesBtn.addEventListener("click", toggleBoxes);
  };

  const bindGameEvents = () => {
    // events that only make sense once a game is running
    menuBtn.addEventListener("click", bringMenu);
    checkBtn.addEventListener("click", toggleBoxes);
    continueBtn.addEventListener("click", resumeGame);
    quitBtn.addEventListener("click", quitGame);

    restartBtns.forEach((btn) => {
      btn.addEventListener("click", restartGame);
    });
  };

  return {
    init: () => {
      bindGlobalEvents();
    },
    bindGameEvents: () => {
      bindGameEvents();
    },
  };
};
