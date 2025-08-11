export const MenuConroller = () => {
  const gameRulesBtn = document.querySelector("#game-rules-btn");
  const checkBtn = document.querySelector(".close-rules-btn");
  const menuBtn = document.querySelector(".game-info-menu");
  const continueBtn = document.getElementById("resume-btn");
  const restartBtn = document.getElementById("restart-btn");
  const quitBtn = document.getElementById("quit-btn");

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

  const quitGame = () => {
    close();
    document.querySelector("#game-screen").classList.add("hidden");
    document.querySelector("#home-screen").classList.remove("hidden");
  };

  const bindEvents = () => {
    gameRulesBtn.addEventListener("click", toggleBoxes);
    menuBtn.addEventListener("click", bringMenu);
    checkBtn.addEventListener("click", toggleBoxes);
    continueBtn.addEventListener("click", close);
    quitBtn.addEventListener("click", quitGame);
  };

  return {
    init: () => {
      bindEvents();
    },
  };
};
