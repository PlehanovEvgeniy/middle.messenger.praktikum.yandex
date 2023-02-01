import "./assets/styles/global.less";
import "./assets/styles/normalize.less";
import { registerComponents, renderDOM } from "./helpers";
import { Router } from "./services/router";
import Button from "./components/button";
import NavLink from "./components/navLink";
import Input from "./components/input";
import ProfileInput from "./components/profileInput";
import Link from "./components/link";

import NotFound from "./pages/notFound/notFound";
import ServerError from "./pages/serverError/serverError";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import Profile from "./pages/profile/profile";
import ChangeData from "./pages/changeData/changeData";
import ChangePassword from "./pages/changePassword/changePassword";
import Chat from "./pages/chat/chat";
import Navigation from "./pages/navigation/navigation";

registerComponents([Button, Link, NavLink, Input, ProfileInput]);

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router("#app");

  window.router = router;

  router
    .use("/404", NotFound)
    .use("/500", ServerError)
    .use("/login", Login)
    .use("/registration", Registration)
    .use("/profile", Profile)
    .use("/changeData", ChangeData)
    .use("/changePassword", ChangePassword)
    .use("/chat", Chat)
    .use("/", Navigation)
    .start();
});
