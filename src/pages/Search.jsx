import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
    isButtonDisabled: true,
  }

  validateButton = () => {
    const { artistName } = this.state;
    this.setState({ isButtonDisabled: artistName.length < '2' });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  }

  render() {
    const { isButtonDisabled, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
            >
              Procurar
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default Search;
