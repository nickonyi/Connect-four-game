import "../styles/style.css";

const gameRulesBtn = document.querySelector("#game-rules-btn");
const checkBtn = document.querySelector(".close-rules-btn");

const toggleBoxes = () => {
  const box1 = document.querySelector(".main-menu-tab");
  const box2 = document.querySelector(".rules-section");

  if (box1.classList.contains("visible")) {
    box1.classList.replace("visible", "hidden");
    box2.classList.replace("hidden", "visible");
  } else {
    box2.classList.replace("visible", "hidden");
    box1.classList.replace("hidden", "visible");
  }
};

gameRulesBtn.addEventListener("click", toggleBoxes);
checkBtn.addEventListener("click", toggleBoxes);
