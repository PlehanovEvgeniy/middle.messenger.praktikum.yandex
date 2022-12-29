import "./assets/styles/global.less";
import "./assets/styles/normalize.less";
import { registerComponents, renderDOM } from "./helpers";
import NotFound from "./pages/notFound/notFound";

import Button from "./components/button";
import NavLink from "./components/navLink";
import Input from "./components/input";
import ProfileInput from "./components/profileInput";

registerComponents([Button, NavLink, Input, ProfileInput]);

const routes = {
  ["#404"]: NotFound,
};

document.addEventListener("DOMContentLoaded", () => {
  const hash = document.location.hash;
  renderDOM("#app", routes[hash]);
});
