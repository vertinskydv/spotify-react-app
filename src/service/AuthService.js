import { CLIENT_ID } from '../const/spotify';

import { appStateStore } from '../store/AppState.store';
import { storageService } from './StorageService';
import { urlService } from './UrlService';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = encodeURIComponent(`${window.location.origin}/search`);

class Auth {
  constructor() {
    this._appStateStore = appStateStore;
    this._storageService = storageService;
    this._urlService = urlService;
  }

  logIn() {
    window.location.href = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}`;
  }

  storeToken() {
    const token = this._urlService.getTokenFromUrl();
    if (!token) { return false; }
    this._appStateStore.setAccessToken(token);
    this._storageService.setToken(token);
    return true;
  }

  logOut() {
    this._appStateStore.setAccessToken('');
    this._storageService.cleanToken();
  }
}

export const authService = new Auth();
