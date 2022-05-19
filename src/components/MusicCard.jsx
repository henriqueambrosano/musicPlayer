import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.addAsFavoriteSong = this.addAsFavoriteSong.bind(this);
  }

  state = {
    loading: false,
    isFavorite: false,
  }

  async addAsFavoriteSong() {
    this.setState((prev) => ({ loading: true, isFavorite: !prev.isFavorite }));
    await addSong(this.props);
    this.setState({ loading: false });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, isFavorite } = this.state;
    const loadingElement = <p>Carregando...</p>;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {loading ? loadingElement
          : (
            <label htmlFor="favorite">
              <input
                checked={ isFavorite }
                name="favoriteSongs"
                type="checkbox"
                id="favorite"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.addAsFavoriteSong }
              />
              Favorita
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
