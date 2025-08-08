import "../styles/style.css";
import { MenuConroller } from "./menuController";

const App = (() => {
  const menu = MenuConroller();

  const start = () => {
    menu.init();
  };

  return { start };
})();

App.start();
