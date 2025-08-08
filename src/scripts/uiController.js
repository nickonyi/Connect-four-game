export const UIcontroller = () => {
  const homeScreen = document.getElementById("home-screen");
  const gameScreen = document.getElementById("game-screen");
  const pvpButton = document.getElementById("pvp-btn");

  const showGameScreen = () => {
    homeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  };

  const bindEvents = () => {
    pvpButton.addEventListener("click", showGameScreen);
  };

  return {
    init: () => {
      bindEvents();
    },
  };
};
