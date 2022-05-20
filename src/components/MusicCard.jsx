import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const { music: { previewUrl, trackName, trackId },
      handleRemove, music, isChecked } = this.props;
    const { loading } = this.state;
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
                defaultChecked={ isChecked }
                name="favoriteSongs"
                type="checkbox"
                id={ trackName }
                data-testid={ `checkbox-music-${trackId}` }
                onClick={ () => handleRemove(music) }
              />
              Favorita
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  handleRemove: PropTypes.func.isRequired,
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
