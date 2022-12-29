import "./assets/styles/global.less";
import "./assets/styles/normalize.less";
import { registerComponents, renderDOM } from "./helpers";

import Button from "./components/button";
import NavLink from "./components/navLink";
import Input from "./components/input";
import ProfileInput from "./components/profileInput";

import NotFound from "./pages/notFound/notFound";
import ServerError from "./pages/serverError/serverError";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import Profile from "./pages/profile/profile";
import ChangeData from "./pages/changeData/changeData";
import ChangePassword from "./pages/changePassword/changePassword";
import Chat from "./pages/chat/chat";

registerComponents([Button, NavLink, Input, ProfileInput]);

const routes = {
  ["#404"]: NotFound,
  ["#500"]: ServerError,
  ["#login"]: Login,
  ["#registration"]: Registration,
  ["#profile"]: Profile,
  ["#changeData"]: ChangeData,
  ["#changePassword"]: ChangePassword,
  ["#chat"]: Chat
};

document.addEventListener("DOMContentLoaded", () => {
  const hash = document.location.hash;
  renderDOM("#app", routes[hash]);
});
