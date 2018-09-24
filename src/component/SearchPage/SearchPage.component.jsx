import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';
import { FadeLoader } from 'react-spinners';

import imageUrl from './assets/search.jpg';
import { SearchPageVM } from './SearchPage.vm';
import { Input, Button, AlbumList } from '../Shared';

const TITLE = 'Time to find some good album...';


@observer
export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this._vm = SearchPageVM;
    this._vm.initialize(props);
  }

  render() {
    const vm = this._vm;
    return (
      <Fragment>
        <div className={css(SS.searchContainer)}>
          <div className={css(SS.searchContentContainer)}>
            <h2 className={css(SS.searchTitle)}>{TITLE}</h2>
            <div className={css(SS.searchBlock)}>
              <Input style={SS.input} value={vm.inputText} onChange={this._onInputTextChange} />
              <Button style={SS.button} onClick={this._onSearch}>Search Album</Button>
            </div>
          </div>
        </div>
        <div className={css(SS.resultContainer)}>
          { this._renderSearchResult() }
        </div>
      </Fragment>
    );
  }

  _renderSearchResult() {
    const vm = this._vm;

    if(vm.isBusy) {
      return(
        <div className={css(SS.loaderContainer)}>
          <FadeLoader color={'#1b48bb'}/>
        </div>
      );
    }

    if(vm.albums && vm.albums.length) {
      return (
        <div>
          <h3>Search result: "{vm.searchText}"</h3>
          <AlbumList albums={vm.albums}/>
        </div>
      );
    } else if (vm.searchText) {
      return (
        <h3>No results for: "{vm.searchText}"</h3>
      );
    } else {
      return (
        <h3>Type something for start search</h3>
      );
    }
  }

  _onInputTextChange = (e) => {
    this._vm.setInputText(e.target.value);
  }

  _onSearch = (e) => {
    this._vm.onSearch();
  }
}

const SS = StyleSheet.create({
  searchContainer: {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    boxShadow: '0px 0px 26px -5px rgba(0,0,0,0.75)',
    minHeight: 200,
    paddingTop: 10,
  },
  searchContentContainer: {
    maxWidth: 600,
    margin: '0 auto',
  },
  searchBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  searchTitle: {
    color: '#FFF',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 20,
    fontSize: 15
  },
  loaderContainer: {
    display: 'flex',
    height: 500,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultContainer: {
    padding: 20,
    maxWidth: 900,
    margin: '0 auto',
    boxShadow: '0px 0px 69px -27px rgba(0,0,0,1)',
  }
});
