import { authService } from '../../service/AuthService';

class LoginPage {
  constructor() {
    this._authService = authService;
  }

  initialize() {
    this._authService.logOut();
  }

  onLogin = () => {
    this._authService.logIn();
  }
}

export const loginPageVM = new LoginPage();
