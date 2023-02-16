import { ApiInstance } from '../../helpers/httpTransport';
import { LoginInrerface, RegisterInrerface } from './apiAuth.model';

class ApiAuthService {
  registation(data: RegisterInrerface): Promise<XMLHttpRequest> {
    return ApiInstance.post('auth/signup', {
      data,
    });
  }

  getUser(): Promise<XMLHttpRequest> {
    return ApiInstance.get('auth/user');
  }

  login(data: LoginInrerface): Promise<XMLHttpRequest> {
    return ApiInstance.post('auth/signin', {
      data,
    });
  }

  logout(): Promise<XMLHttpRequest> {
    return ApiInstance.post('auth/logout');
  }
}

export const apiAuth = new ApiAuthService();
