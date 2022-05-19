import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    albumImage: '',
    artistName: '',
    albumName: '',
    tracks: [],
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const album = await getMusics(params.id);
    this.setState({
      albumImage: album[0].artworkUrl100,
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
      tracks: album.slice(1),
    });
  }

  render() {
    const { albumImage, artistName, albumName, tracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-container">
          <div className="album">
            <img src={ albumImage } alt={ albumName } />
            <h2 data-testid="album-name">{albumName}</h2>
            <h3 data-testid="artist-name">{artistName}</h3>
          </div>
          <div className="tracks">
            {tracks.map((track) => (<MusicCard
              key={ track.trackName }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
            />))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
