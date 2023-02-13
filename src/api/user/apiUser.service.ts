import { ApiInstance } from "../../helpers/httpTransport";
import {
  ProfileUserAvatarUpd,
  ProfileUserPasswordUpd,
  ProfileUserSearch,
  ProfileUserUpd,
} from "./apiUser.model";

class ApiUserService {
  updateUserInfo(data: ProfileUserUpd): Promise<XMLHttpRequest> {
    return ApiInstance.put("user/profile", {
      data,
    });
  }

  updateUserAvatar(data: ProfileUserAvatarUpd): Promise<XMLHttpRequest> {
    const formData = new FormData();

    formData.set("avatar", data.avatar as Blob);

    return ApiInstance.put("user/profile/avatar", {
      data: formData,
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

export const ApiUser = new ApiUserService();
