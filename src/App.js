import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { LoginPage } from './component/LoginPage';
import { SearchPage } from './component/SearchPage';
import { AlbumInfoPage } from './component/AlbumInfoPage';

import { appStateStore } from './store/AppState.store';
import { storageService } from './service/StorageService';

class App extends Component {
  constructor() {
    super();
    this._appState = appStateStore;
    this._storageService = storageService;

    const token = this._storageService.getToken();
    if (token) {
      this._appState.setAccessToken(token);
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/album/:id" component={AlbumInfoPage} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
