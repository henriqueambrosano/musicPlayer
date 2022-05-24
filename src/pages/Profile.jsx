import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import './profile.css';

class Profile extends React.Component {
  state = {
    loading: true,
    image: '',
    name: '',
    email: '',
    description: '',
  }

  async componentDidMount() {
    const userData = await getUser();
    const { description, name, image, email } = userData;
    this.setState({ description, name, image, email, loading: false });
  }

  render() {
    const { loading, description, name, image, email } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading />
          : (
            <div className="user-data">
              <div className="image-section">
                <img
                  className="user-image"
                  src={ image }
                  alt={ name }
                  data-testid="profile-image"
                />
                <Link className="btn-edit" to="/profile/edit">Editar perfil</Link>
              </div>
              <div className="user-data-section">
                <h3>Nome</h3>
                <p>{name}</p>
              </div>
              <div className="user-data-section">
                <h3>Email</h3>
                <p>{email}</p>
              </div>
              <div className="user-data-section">
                <h3>Descrição</h3>
                <p>{description}</p>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
