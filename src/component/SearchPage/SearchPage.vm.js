import { observable, action, reaction } from 'mobx';
import { debounce } from 'underscore';

import { appStateStore } from '../../store/AppState.store';
import { authService } from '../../service/AuthService';
import { searchService } from '../../service/SearchService';

const AUTO_SEARCH_TIME = 2000;

class SearchPage {
  @observable inputText = '';
  @observable searchText = '';
  @observable albums;
  @observable isBusy = false;
  _history = null;

  constructor() {
    this._authService = authService;
    this._searchService = searchService;
    this._appStateStore = appStateStore;

    // call onSearch after 2sec delay after input change
    reaction(
      () => this.inputText,
      (inputText) => {
        if (inputText) {
          this._lazySearch();
        } else {
          this._lazySearch.cancel();
        }
      },
    );
  }

  _lazySearch = debounce(this.onSearch, AUTO_SEARCH_TIME);

  @action
  initialize(props) {
    this._history = props.history;
    if (!this._appStateStore.accessToken) {
      const setTokenSuccess = this._authService.storeToken();
      if (!setTokenSuccess) {
        props.history.push('/login');
      } else {
        props.history.replace('/search');
      }
    }
  }

  @action
  setInputText(text) {
    this.inputText = text;
  }

  @action
  setSearchText(text) {
    this.searchText = text;
  }

  @action
  setAlbums(albums) {
    this.albums = albums;
  }

  @action
  async onSearch() {
    this._lazySearch.cancel();
    if (!this.inputText) { return; }
    this.isBusy = true;
    const response = await this._searchService.getAlbumsByText(this.inputText);
    if (response.error && response.error.status === 401) {
      this._history.push('/login');
      return;
    }

    const albums = response.albums.items;
    this.setSearchText(this.inputText);
    this.setAlbums(albums);
    this.isBusy = false;
  }
}

export const SearchPageVM = new SearchPage();
