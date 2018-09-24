import { appStateStore } from '../store/AppState.store';

class SearchService {
  constructor() {
    this._appStateStore = appStateStore;
  }

  async getAlbumsByText(text) {
    const headers = new Headers({
      Authorization: `Bearer ${this._appStateStore.accessToken}`,
    });
    const resData = await fetch(`https://api.spotify.com/v1/search?type=album&q=${text}`, { headers });
    const res = await resData.json();
    return res;
  }

  async getAlbumById(id) {
    const headers = new Headers({
      Authorization: `Bearer ${this._appStateStore.accessToken}`,
    });
    const resData = await fetch(`https://api.spotify.com/v1/albums/${id}`, { headers });
    const res = await resData.json();
    return res;
  }
}

export const searchService = new SearchService();
