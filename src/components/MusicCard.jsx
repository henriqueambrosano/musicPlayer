import React from 'react';
import PropTypes from 'prop-types';
import './musicCard.css';

class MusicCard extends React.Component {
  render() {
    const { music: { previewUrl, trackName, trackId },
      handleRemove, music, isChecked } = this.props;
    return (
      <div>
        <div className="track">
          <h4>{trackName}</h4>
          <div className="audio-container">
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label className="favorite-label" htmlFor={ trackName }>
              <input
                className="favorite"
                defaultChecked={ isChecked }
                name="favoriteSongs"
                type="checkbox"
                id={ trackName }
                data-testid={ `checkbox-music-${trackId}` }
                onClick={ () => handleRemove(music) }
              />
              <i className="fa-solid fa-heart is-favorite" />
              <i className="fa-regular fa-heart not-favorite" />
            </label>
          </div>
        </div>
        <div className="line" />
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
