import { observable, computed } from 'mobx';

class AppState {
  @observable _accessToken = '';

  @computed
  get accessToken() {
    return this._accessToken;
  }

  setAccessToken(token) {
    this._accessToken = token;
  }
}

export const appStateStore = new AppState();
