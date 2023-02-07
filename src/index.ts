import "./assets/styles/global.less";
import "./assets/styles/normalize.less";
import { registerComponents } from "./helpers";
import { Router } from "./services/router";
import { Store } from "./services/store";
import Button from "./components/button";
import NavLink from "./components/navLink";
import Input from "./components/input";
import ProfileInput from "./components/profileInput";
import Link from "./components/link";
import ProfileAvatar from "./components/profileAvatar";
import ChatList from "./components/chatList";
import ChatMessage from "./components/chatMessage";

import NotFound from "./pages/notFound/notFound";
import ServerError from "./pages/serverError/serverError";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import Profile from "./pages/profile/profile";
import ChangeData from "./pages/changeData/changeData";
import ChangePassword from "./pages/changePassword/changePassword";
import Chat from "./pages/chat/chat";

registerComponents([
  Button,
  Link,
  NavLink,
  Input,
  ProfileInput,
  ProfileAvatar,
  ChatList,
  ChatMessage,
]);

document.addEventListener("DOMContentLoaded", () => {
  console.log("rerender");
  const router = new Router("#app");
  const store = new Store({ currentUser: null, chats: [] });

  window.router = router;
  window.store = store;

  router
    .use("/404", NotFound)
    .use("/500", ServerError)
    .use("/", Login)
    .use("/sign-up", Registration)
    .use("/profile", Profile)
    .use("/settings", ChangeData)
    .use("/changePassword", ChangePassword)
    .use("/messenger", Chat)
    .start();
});
