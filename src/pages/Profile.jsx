import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: true,
    image: '',
    name: '',
    email: '',
    description: '',
  }

  componentDidMount = async () => {
    const userData = await getUser();
    const { description, name, image, email } = userData;
    this.setState({ description, name, image, email, loading: false });
  }

  render() {
    const loadingElement = <p>Carregando...</p>;
    const { loading, description, name, image, email } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? loadingElement
          : (
            <div className="user-info">
              <div>
                <img src={ image } alt={ name } data-testid="profile-image" />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <div>
                <h3>Nome</h3>
                <p>{name}</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>{email}</p>
              </div>
              <div>
                <h3>Description</h3>
                <p>{description}</p>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
