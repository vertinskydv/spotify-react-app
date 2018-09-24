import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';
import { PropTypes } from 'prop-types';

import { albumInfoVM } from './AlbumInfoPage.vm';
import { TrackList, Button } from '../Shared';

@observer
export class AlbumInfoPage extends Component {
  constructor(props) {
    super(props);

    this._vm = albumInfoVM;
    this._vm.initialize(props);
  }

  _onBack = () => {
    this.props.history.goBack();
  }

  render() {
    const vm = this._vm;

    return (
      <Fragment>
        {!vm.isBusy &&
          <div className={css(SS.container)}>
            <Button onClick={this._onBack}>Back</Button>
            <div className={css(SS.albumInfoBlock)}>
              <figure className={css(SS.imgWrapper)}>
                <img className={css(SS.img)} src={vm.imgUrl} alt="album cover" />
              </figure>
              <div>
                <h2>{vm.name}</h2>
                <div>{vm.artists}</div>
              </div>
            </div>

            <TrackList style={SS.trackList} tracks={vm.tracks} />
          </div>
        }
      </Fragment>
    );
  }
}

AlbumInfoPage.propTypes = {
  history: PropTypes.object.isRequired,
};

const imageSize = 250;
const SS = StyleSheet.create({
  container: {
    maxWidth: 700,
    margin: '0 auto',
    padding: 10,
    boxShadow: '0px 0px 69px -27px rgba(0,0,0,1)',
  },
  albumInfoBlock: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    color: '#fff',
    backgroundColor: '#1b48bb',
    padding: 10,
  },
  imgWrapper: {
    width: imageSize,
    height: imageSize,
    margin: '0 20px 0 0',
    overflow: 'hidden',
  },
  trackList: {
    marginLeft: imageSize + 20,
  },
  img: {
    width: '100%',
  },
});
