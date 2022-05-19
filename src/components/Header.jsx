import React from 'react';
import { getUser } from '../services/userAPI';

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
    const loadingElement = <h1>Carregando...</h1>;
    return (
      <header data-testid="header-component">
        {loading ? loadingElement
          : (
            <p data-testid="header-user-name">
              {name}
            </p>
          )}
      </header>
    );
  }
}

export default Header;
