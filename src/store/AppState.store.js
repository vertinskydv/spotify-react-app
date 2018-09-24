import { observable, computed } from 'mobx';

class AppState {
  @observable _access_token = '';

  @computed
  get accessToken() {
    return this._access_token;
  }

  setAccessToken(token) {
    this._access_token = token;
  }
}

export const appStateStore = new AppState();

