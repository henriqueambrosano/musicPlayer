import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.addRemoveFavorite = this.addRemoveFavorite.bind(this);
  }

  state = {
    loading: true,
    albumImage: '',
    artistName: '',
    albumName: '',
    tracks: [],
    favoriteTracks: [],
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const album = await getMusics(params.id);
    const favoriteTracks = await getFavoriteSongs();
    this.setState({
      albumImage: album[0].artworkUrl100,
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
      tracks: album.slice(1),
      favoriteTracks,
      loading: false,
    });
  }

  isFavorite = (track) => {
    const { favoriteTracks } = this.state;
    return !!favoriteTracks.find((item) => (
      item.trackId === track.trackId));
  }

  async addRemoveFavorite(music) {
    this.setState({ loading: true });
    if (this.isFavorite(music)) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    const favoriteTracks = await getFavoriteSongs();
    this.setState({ favoriteTracks, loading: false });
  }

  render() {
    const { albumImage, artistName, albumName, tracks, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading />
          : (
            <div className="album-container">
              <div className="album">
                <img src={ albumImage } alt={ albumName } />
                <h2 data-testid="album-name">{albumName}</h2>
                <h3 data-testid="artist-name">{artistName}</h3>
              </div>
              <div className="tracks-container">
                <div className="line" />
                {tracks.map((track) => (<MusicCard
                  music={ track }
                  handleRemove={ this.addRemoveFavorite }
                  isChecked={ this.isFavorite(track) }
                  key={ track.trackId }
                />))}
              </div>
            </div>
          )}
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
