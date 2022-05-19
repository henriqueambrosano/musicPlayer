import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.addAsFavoriteSong = this.addAsFavoriteSong.bind(this);
    const { isChecked } = this.props;

    this.state = {
      loading: false,
      isFavorite: isChecked,
    };
  }

  async addAsFavoriteSong({ target }) {
    const { checked } = target;
    this.setState((prev) => ({ loading: true, isFavorite: !prev.isFavorite }));
    if (checked) {
      await addSong(this.props);
    } else {
      await removeSong(this.props);
    }
    this.setState({ loading: false });
    getFavoriteSongs();
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
            <label htmlFor={ trackName }>
              <input
                checked={ isFavorite }
                name="favoriteSongs"
                type="checkbox"
                id={ trackName }
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
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
