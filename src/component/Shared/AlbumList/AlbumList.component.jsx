import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { artistsToString } from '../../../helper/dataFormat.helper';

export class AlbumList extends PureComponent {
  render() {
    const { albums } = this.props;

    return (
      <ul className={css(SS.list)}>
        {
          albums.map((album) => {
            const artist = artistsToString(album.artists);
            return (
              <li className={css(SS.item)} key={album.id}>
                <figure className={css(SS.imgWrapper)}>
                  <img className={css(SS.img)} src={album.images[1].url} alt="album cover" />
                </figure>
                <div className={css(SS.info)}>
                  <Link to={`/album/${album.id}`} className={css(SS.link)}>
                    {album.name}
                  </Link>
                  <div className={css(SS.artist)}>{artist}</div>
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

AlbumList.propTypes = {
  albums: PropTypes.array,
};

AlbumList.defaultProps = {
  albums: [],
};

const SS = StyleSheet.create({
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  imgWrapper: {
    width: 120,
    height: 120,
    margin: 0,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
  },
  info: {
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});
