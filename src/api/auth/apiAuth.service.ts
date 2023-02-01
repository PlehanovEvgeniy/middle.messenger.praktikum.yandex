import { ApiInstance } from "../../helpers/httpTransport";
import { LoginInrerface, RegisterInrerface } from "./apiAuth.model";

export default class ApiAuthService {
  private static __instance: ApiAuthService;

  constructor() {
    if (ApiAuthService.__instance) {
      return ApiAuthService.__instance;
    }

    ApiAuthService.__instance = this;
  }

  registation(data: RegisterInrerface): Promise<XMLHttpRequest> {
    return ApiInstance.get("auth/signup", {
      data,
    });
  }

  getUser(): Promise<XMLHttpRequest> {
    return ApiInstance.get("auth/user");
  }

  login(data: LoginInrerface): Promise<XMLHttpRequest> {
    return ApiInstance.post("auth/signin", {
      data,
    });
  }

  logout(): Promise<XMLHttpRequest> {
    return ApiInstance.post("auth/logout");
  }
}
