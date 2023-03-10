import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './favorites.css';

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
    return (
      <div className="page-favorites" data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        <div>
          <h1>Músicas favoritas</h1>
          <div className="line" />
          {favoriteTracks.map((track) => (<MusicCard
            isChecked
            music={ track }
            handleRemove={ this.addRemoveFavorite }
            key={ track.trackId }
          />))}
        </div>
      </div>
    );
  }
}

export default Favorites;
