const TOKEN_URL_KEY = 'access_token=';

class UrlService {
  getTokenFromUrl() {
    const { href } = window.location;
    if (href.indexOf(TOKEN_URL_KEY) === -1) { return false; }
    const token = href.split(TOKEN_URL_KEY).pop().split('&').shift();
    return token;
  }
}

export const urlService = new UrlService();
