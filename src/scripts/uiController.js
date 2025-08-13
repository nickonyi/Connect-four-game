import playerOneIcon from "../assets/images/player-one.svg";
import playerTwoIcon from "../assets/images/player-two.svg";
import youIcon from "../assets/images/you.svg";
import cpuIcon from "../assets/images/cpu.svg";

export const UIcontroller = (startGame) => {
  const homeScreen = document.getElementById("home-screen");
  const gameScreen = document.getElementById("game-screen");
  const leftScoreboard = document.getElementById("left-scoreboard");
  const rightScoreboard = document.getElementById("right-scoreboard");

  const showGameScreen = () => {
    homeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  };

  const pickScoreboard = (mode) => {
    if (mode === "pvp") {
      leftScoreboard.innerHTML = `
      <div class="player-box box-shadow-black">
        <div class="player-name">Player 1</div>
        <div class="player-score">0</div>
        <img src="${playerOneIcon}" alt="" class="player-icon" />
      </div>
    `;

      rightScoreboard.innerHTML = `
      <div class="player-box box-shadow-black">
        <div class="player-name">Player 2</div>
        <div class="player-score">0</div>
        <img src="${playerTwoIcon}" alt="" class="player-icon" />
      </div>
    `;
    }

    if (mode === "cpu") {
      leftScoreboard.innerHTML = `
      <div class="player-box box-shadow-black">
        <div class="player-name">You</div>
        <div class="player-score">0</div>
        <img src="${youIcon}" alt="" class="player-icon" />
      </div>
    `;

      rightScoreboard.innerHTML = `
      <div class="player-box box-shadow-black">
        <div class="player-name">CPU</div>
        <div class="player-score">0</div>
      <img src="${cpuIcon}" alt="" class="player-icon" />
      </div>
    `;
    }
  };

  const bindEvents = () => {
    document.getElementById("pvp-btn").addEventListener("click", () => {
      pickScoreboard("pvp");
      showGameScreen();
      startGame("pvp");
    });

    document.getElementById("cpu-btn").addEventListener("click", () => {
      pickScoreboard("cpu");
      showGameScreen();
      startGame("cpu");
    });
  };

  return {
    init: () => {
      bindEvents();
    },
  };
};
