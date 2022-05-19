import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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

  async searchArtist() {
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
    const loadingElement = <h1>Carregando...</h1>;
    const noResultElement = <h1>Nenhum álbum foi encontrado</h1>;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? loadingElement
          : (
            <section>
              <form>
                <input
                  type="text"
                  name="artistName"
                  value={ artistName }
                  placeholder="Nome do artista"
                  data-testid="search-artist-input"
                  onChange={ this.onInputChange }
                />
                <button
                  disabled={ isButtonDisabled }
                  type="button"
                  data-testid="search-artist-button"
                  onClick={ this.searchArtist }
                >
                  Procurar
                </button>
              </form>
            </section>
          )}
        {searchResult.length > 0
          && (
            <div>
              <h2>
                {`Resultado de álbuns de: ${searchedArtist}`}
              </h2>
              {searchResult.map((album) => (
                <div key={ album.collectionId }>
                  <img alt={ album.collectionName } src={ album.artworkUrl100 } />
                  <p>{ album.collectionName }</p>
                  <p>{ album.artistName }</p>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    Go to album
                  </Link>
                </div>
              ))}
            </div>
          )}
        {noResultFound && noResultElement}
      </div>
    );
  }
}

export default Search;
