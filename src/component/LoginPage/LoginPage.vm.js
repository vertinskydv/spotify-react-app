import { authService } from '../../service/AuthService';

class LoginPage {
  constructor() {
    this._authService = authService;
  }

  onLogin = () => {
    this._authService.logIn();
  }
}

export const LoginPageVM = new LoginPage();
