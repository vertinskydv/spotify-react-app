import { observable, action, reaction } from 'mobx';
import { debounce } from 'underscore'

import { authService } from '../../service/AuthService';
import { searchService } from '../../service/SearchService';

const AUTO_SEARCH_TIME = 2000;

class SearchPage {
  @observable inputText = '';
  @observable searchText = '';
  @observable albums;
  @observable isBusy = false;

  constructor () {
    this._authService = authService;
    this._searchService = searchService;

    // call onSearch after 2sec delay after input change
    reaction(() => this.inputText,
      (inputText) => {
        if (inputText) {
          this._lazySearch();
        } else {
          this._lazySearch.cancel();
        }
      }
    )
  }

  _lazySearch = debounce(this.onSearch, AUTO_SEARCH_TIME);

  @action
  initialize(props) {
    this._history = props.history;
    const success = this._authService.storeToken();
    if (!success) {
      props.history.push('/login');
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
    if (!this.inputText) {return};
    this.isBusy = true;
    const response = await this._searchService.getAlbumsByText(this.inputText);
    if(response.error && response.error.status === 401) {
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
