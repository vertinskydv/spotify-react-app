import { observable, action, runInAction } from 'mobx';

import { searchService } from '../../service/SearchService';
import { artistsToString } from '../../helper/dataFormat.helper';

class AlbumInfo {
  @observable isBusy = false;
  @observable name;
  @observable artists;
  @observable imgUrl;
  @observable tracks;

  constructor() {
    this._search = searchService;
  }

  initialize(props) {
    this._history = props.history;
    this.getAlbum(props.match.params.id);
  }

  @action
  getAlbum = async (id) => {
    this.isBusy = true;
    const album = await this._search.getAlbumById(id);
    if (album.error && album.error.status === 401) {
      this._history.push('/login');
      return;
    }

    runInAction(() => {
      this.name = album.name;
      this.imgUrl = album.images[1].url;
      this.artists = artistsToString(album.artists);
      this.tracks = album.tracks.items;
    });
    this.isBusy = false;
  }
}

export const albumInfoVM = new AlbumInfo();
