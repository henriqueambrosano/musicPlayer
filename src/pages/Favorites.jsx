import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.addRemoveFavorite = this.addRemoveFavorite.bind(this);
  }

  state = {
    loading: true,
    favoriteTracks: [],
  }

  async componentDidMount() {
    const favoriteTracks = await getFavoriteSongs();
    this.setState({ favoriteTracks, loading: false });
  }

  addRemoveFavorite(music) {
    this.setState({ loading: true }, async () => {
      await removeSong(music);
      const favoriteTracks = await getFavoriteSongs();
      this.setState({ favoriteTracks, loading: false });
    });
  }

  render() {
    const { loading, favoriteTracks } = this.state;
    const loadingElement = <p>Carregando...</p>;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? loadingElement
          : (
            <div>
              {favoriteTracks.map((track) => (<MusicCard
                isChecked
                music={ track }
                handleRemove={ this.addRemoveFavorite }
                key={ track.trackName }
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                trackId={ track.trackId }
              />))}
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
