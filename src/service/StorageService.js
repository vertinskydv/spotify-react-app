const TOKEN_KEY = 'access_token';

class Storage {
  setToken(value) {
    localStorage.setItem(TOKEN_KEY, value);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
}

export const storageService = new Storage();
