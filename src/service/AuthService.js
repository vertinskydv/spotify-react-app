import { CLIENT_ID } from '../const/spotify';

import { appStateStore } from '../store/AppState.store';
import { storageService } from './StorageService';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = encodeURIComponent(`${window.location.origin}/search`);
const TOKEN_URL_KEY = 'access_token=';

class Auth {
  constructor() {
    this._appStateStore = appStateStore;
    this._storageService = storageService;
  }

  logIn() {
    window.location.href = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}`;
  }

  storeToken() {
    const token = this._getTokenFromUrl();
    if (!token) { return false; }
    this._appStateStore.setAccessToken(token);
    this._storageService.setToken(token);
    return true;
  }

  _getTokenFromUrl() {
    const { href } = window.location;
    if (href.indexOf(TOKEN_URL_KEY) === -1) { return false; }
    const token = href.split(TOKEN_URL_KEY).pop().split('&').shift();
    return token;
  }
}

export const authService = new Auth();
