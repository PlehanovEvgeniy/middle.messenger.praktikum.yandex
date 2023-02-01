export interface User {
    id: string;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface ProfileUserUpd {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface ProfileUserAvatarUpd {
    avatar: string;
}

export interface ProfileUserSearch {
    login: string;
}

export interface ProfileUserPasswordUpd {
    oldPassword: string;
    newPassword: string;
}
