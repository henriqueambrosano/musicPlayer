import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  state = {
    buttonDisabled: true,
    name: '',
    loading: false,
    loaded: false,
  };

  validateButton = () => {
    const { name } = this.state;
    this.setState({ buttonDisabled: name.length < '3' });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  }

  async login() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loaded: true });
  }

  render() {
    const { buttonDisabled, loading, loaded } = this.state;
    const loadingElement = <h1>Carregando...</h1>;
    return (
      <div data-testid="page-login">
        {loaded && <Redirect to="/search" />}
        {loading ? (
          loadingElement
        ) : (
          <section>
            <form>
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="Digite seu nome"
                name="name"
                onChange={ this.onInputChange }
              />
              <button
                disabled={ buttonDisabled }
                data-testid="login-submit-button"
                type="button"
                onClick={ this.login }
              >
                Entrar
              </button>
            </form>
          </section>
        )}
      </div>
    );
  }
}

export default Login;
