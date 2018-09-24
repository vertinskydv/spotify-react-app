import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { LoginPageVM } from './LoginPage.vm';
import { Button } from '../Shared/Button';


export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this._vm = LoginPageVM;
  }

  render() {
    return (
      <div className={css(SS.container)}>
        <h3>Plaese log-in</h3>
        <Button onClick={this._vm.onLogin}>Login</Button>
      </div>
    );
  }
}

const SS = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
    margin: '0 auto',
    width: 150,
    alignItems: 'center',
  },
});
