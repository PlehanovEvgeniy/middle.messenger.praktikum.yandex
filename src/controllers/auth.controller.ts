import { LoginInrerface } from "../api/auth/apiAuth.model";
import ApiAuthService from "../api/auth/apiAuth.service";
import { Router } from "../services/router";

const authService = new ApiAuthService();

export class AuthController {
  private static __instance: AuthController;

  constructor() {
    if (AuthController.__instance) {
      return AuthController.__instance;
    }

    AuthController.__instance = this;
  }
}
