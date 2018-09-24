import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { PropTypes } from 'prop-types';

export class TrackList extends PureComponent {
  render() {
    const { tracks, style } = this.props;
    return (
      <ul className={css(SS.list, style)}>
        { tracks.map(track => (
          <li className={css(SS.item)} key={track.id}>
            {`${track.track_number}. ${track.name}`}
          </li>
        ))}
      </ul>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  style: PropTypes.object,
};

TrackList.defaultProps = {
  style: {},
};

const SS = StyleSheet.create({
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    padding: 10,
  },
});
