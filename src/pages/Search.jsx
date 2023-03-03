import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import './search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchArtist = this.searchArtist.bind(this);
  }

  state = {
    artistName: '',
    isButtonDisabled: true,
    loading: false,
    searchedArtist: '',
    searchResult: [],
    noResultFound: false,
  }

  validateButton = () => {
    const { artistName } = this.state;
    this.setState({ isButtonDisabled: artistName.length < '2' });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  }

  camelCase = (str) => {
    const camelString = str.split(' ')
      .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
    return camelString;
  }

  async searchArtist(e) {
    e.preventDefault();
    const { artistName } = this.state;
    this.setState({ loading: true, searchedArtist: artistName, artistName: '' });
    const result = await searchAlbumsAPI(artistName);
    this.setState({
      loading: false,
      noResultFound: result.length < 1,
      searchResult: result,
    });
  }

  render() {
    const {
      isButtonDisabled,
      artistName, loading, searchResult, searchedArtist, noResultFound } = this.state;
    const noResultElement = <h1>Nenhum álbum foi encontrado</h1>;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading />
          : (
            <div className="search-container">
              <form onSubmit={ this.searchArtist }>
                <input
                  className="search-input"
                  type="text"
                  name="artistName"
                  value={ artistName }
                  placeholder="Nome do artista"
                  data-testid="search-artist-input"
                  onChange={ this.onInputChange }
                />
                <button
                  className="search-btn"
                  disabled={ isButtonDisabled }
                  type="button"
                  data-testid="search-artist-button"
                  onClick={ this.searchArtist }
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )}
        {searchResult.length > 0
          && (
            <div className="album-page">
              <h2>
                {`Resultado de álbuns de: ${this.camelCase(searchedArtist)}`}
              </h2>
              <div className="albuns-container">
                {searchResult.map((album) => (
                  <div className="album-card" key={ album.collectionId }>
                    <img alt={ album.collectionName } src={ album.artworkUrl100 } />
                    <p className="title">{ album.collectionName }</p>
                    <p>{ album.artistName }</p>
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/album/${album.collectionId}` }
                    >
                      Ir para o album
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        {noResultFound && noResultElement}
      </div>
    );
  }
}

export default Search;
