import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';
import logoHeader from '../images/logo-header.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.loadHeader = this.loadHeader.bind(this);
  }

  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    this.loadHeader();
  }

  async loadHeader() {
    const user = await getUser();
    this.setState({ name: user.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading />
          : (
            <div className="header-container">
              <div className="top-section">
                <Link to="/">
                  <img
                    src={ logoHeader }
                    alt="trybetunes logo"
                    className="top-section-image"
                  />
                </Link>
                <div className="user-info">
                  <i className="fa-solid fa-circle-user" />
                  <p data-testid="header-user-name">
                    {`Olá, ${name}`}
                  </p>
                </div>
              </div>
              <div className="nav-bar">
                <Link
                  to="/search"
                  data-testid="link-to-search"
                >
                  PESQUISAR
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites">FAVORITOS</Link>
                <Link to="/profile" data-testid="link-to-profile">PERFIL</Link>
              </div>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
