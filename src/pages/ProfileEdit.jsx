import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    name: '',
    image: '',
    email: '',
    description: '',
    isBtnDisabled: true,
    redirect: false,
  }

  async componentDidMount() {
    const userData = await getUser();
    const { name, image, email, description } = userData;
    this.setState({ name, image, email, description, loading: false });
    this.validadeForm();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), this.validadeForm);
  }

  validadeForm = () => {
    const { name, image, email, description } = this.state;

    // regex copiada do site https://www.w3resource.com/javascript/form/email-validation.php
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (name && image && email.match(mailFormat) && description) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  saveUserInfo = async () => {
    const { name, image, email, description } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name,
      image,
      email,
      description,
    });
    this.setState({ redirect: true });
  }

  render() {
    const { loading, name, image, email, description, isBtnDisabled,
      redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {redirect && <Redirect to="/profile" /> }
        {loading ? <Loading />
          : (
            <section>
              <form>
                <div>
                  <img src={ image } alt={ name } />
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="image"
                    value={ image }
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <p>Nome</p>
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <p>Email</p>
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <p>Descrição</p>
                  <input
                    data-testid="edit-input-description"
                    type="text"
                    name="description"
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </div>
                <button
                  disabled={ isBtnDisabled }
                  data-testid="edit-button-save"
                  type="button"
                  onClick={ this.saveUserInfo }
                >
                  Salvar
                </button>
              </form>
            </section>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
