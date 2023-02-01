import { ApiInstance } from "../../helpers/httpTransport";
import {
  ProfileUserAvatarUpd,
  ProfileUserPasswordUpd,
  ProfileUserSearch,
  ProfileUserUpd,
} from "./apiUser.model";


export default class ApiChatService {
  private static __instance: ApiChatService;

  constructor() {
    if (ApiChatService.__instance) {
      return ApiChatService.__instance;
    }

    ApiChatService.__instance = this;
  }

  updateUserInfo(data: ProfileUserUpd): Promise<XMLHttpRequest> {
    return ApiInstance.put("user/profile", {
      data,
    });
  }

  updateUserAvatar(data: ProfileUserAvatarUpd): Promise<XMLHttpRequest> {
    return ApiInstance.put("user/profile/avatar", {
      data,
    });
  }

  updateUserPassword(data: ProfileUserPasswordUpd): Promise<XMLHttpRequest> {
    return ApiInstance.put("user/password", {
      data,
    });
  }

  searchUser(data: ProfileUserSearch): Promise<XMLHttpRequest> {
    return ApiInstance.post("user/search", {
      data,
    });
  }
}
