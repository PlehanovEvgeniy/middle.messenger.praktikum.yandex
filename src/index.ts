import "./assets/styles/global.less";
import "./assets/styles/normalize.less";
import { registerComponents, renderDOM } from "./helpers";
import Button from "./components/button";
import NotFound from "./pages/notFound/notFound";

registerComponents([Button]);

const routes = {
  ["#404"]: NotFound,
};

document.addEventListener("DOMContentLoaded", () => {
  const hash = document.location.hash;
  renderDOM("#app", routes[hash]);
});
