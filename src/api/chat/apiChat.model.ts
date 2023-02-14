export interface ChatUser {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: ChatUser;
    time: string;
    content: string;
  };
}

export interface CreateChat {
  title: string;
}

export interface DeleteChat {
  chatId: string;
}

export interface UpdateUsers {
  users: number[];
  chatId: number;
}
