import './assets/styles/global.less';
import './assets/styles/normalize.less';
import { registerComponents } from './helpers';
import { Router, Store } from './services';

import Button from './components/button';
import NavLink from './components/navLink';
import Input from './components/input';
import ProfileInput from './components/profileInput';
import Link from './components/link';
import ProfileAvatar from './components/profileAvatar';
import ChatList from './components/chatList';
import ChatMessage from './components/chatMessages';

import NotFound from './pages/notFound/notFound';
import ServerError from './pages/serverError/serverError';
import Login from './pages/login/login';
import Registration from './pages/registration/registration';
import Profile from './pages/profile/profile';
import ChangeData from './pages/changeData/changeData';
import ChangePassword from './pages/changePassword/changePassword';
import Chat from './pages/chat/chat';
import { apiAuth } from './api';

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

document.addEventListener('DOMContentLoaded', async () => {
  const router = new Router('#app');
  const store = new Store({
    currentUser: null,
    currentChat: null,
    chats: [],
    messages: [],
  });

  window.router = router;
  window.store = store;

  const data = await apiAuth.getUser();

  if (data.status === 200) {
    window.store.dispatch({
      currentUser: JSON.parse(data.response),
    });
  }

  router
    .use('/404', NotFound)
    .use('/500', ServerError)
    .use('/', Login)
    .use('/sign-up', Registration)
    .use('/settings', Profile)
    .use('/settings/edit', ChangeData)
    .use('/settings/editPassword', ChangePassword)
    .use('/messenger', Chat)
    .start();

  if (data.status === 401) {
    window.router.go('/');
  }
});
