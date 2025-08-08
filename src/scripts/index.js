import "../styles/style.css";
import { MenuConroller } from "./menuController";
import { UIcontroller } from "./uiController";
const App = (() => {
  const ui = UIcontroller();
  const menu = MenuConroller();

  const start = () => {
    menu.init();
    ui.init();
  };

  return { start };
})();

App.start();
