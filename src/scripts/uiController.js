export const UIcontroller = () => {
  const homeScreen = document.getElementById("home-screen");
  const gameScreen = document.getElementById("game-screen");
  const leftScoreboard = document.getElementById("left-scoreboard");
  const rightScoreboard = document.getElementById("right-scoreboard");

  const showGameScreen = () => {
    homeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  };

  const updateScoreboard = (mode) => {
    if (mode === "pvp") {
      leftScoreboard.innerHTML = `
      <div class="player-box box-shadow-black">
        <div class="player-name">Player 1</div>
        <div class="player-score">0</div>
        <img src="./assets/images/player-one.svg" alt="" class="player-icon" />
      </div>
    `;

      rightScoreboard.innerHTML = `
      <div class="player-box box-shadow-black">
        <div class="player-name">Player 2</div>
        <div class="player-score">0</div>
        <img src="./assets/images/player-two.svg" alt="" class="player-icon" />
      </div>
    `;
    }

    if (mode === "cpu") {
      leftScoreboard.innerHTML = `
      <div class="player-box box-shadow-black">
        <div class="player-name">You</div>
        <div class="player-score">0</div>
        <img src="./assets/images/player-one.svg" alt="" class="player-icon" />
      </div>
    `;

      rightScoreboard.innerHTML = `
      <div class="player-box box-shadow-black">
        <div class="player-name">CPU</div>
        <div class="player-score">0</div>
        <img src="./assets/images/cpu-icon.svg" alt="" class="player-icon" />
      </div>
    `;
    }
  };

  const bindEvents = () => {
    document.getElementById("pvp-btn").addEventListener("click", () => {
      updateScoreboard("pvp");
      showGameScreen();
    });

    document.getElementById("cpu-btn").addEventListener("click", () => {
      updateScoreboard("cpu");
      showGameScreen();
    });
  };

  return {
    init: () => {
      bindEvents();
    },
  };
};
