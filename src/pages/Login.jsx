import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './login.css';
import logo from '../images/logo.png';

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
    const { buttonDisabled, loading, loaded, name } = this.state;
    return (
      <div className="login-page" data-testid="page-login">
        {loaded && <Redirect to="/search" />}
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="logo-container">
              <img src={ logo } alt="trybetunes logo" />
            </div>
            <div className="login-form-container">
              <input
                className="login-input"
                data-testid="login-name-input"
                type="text"
                placeholder="Digite seu nome"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
              />
              <button
                className="login-btn"
                disabled={ buttonDisabled }
                data-testid="login-submit-button"
                type="button"
                onClick={ this.login }
              >
                Entrar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
