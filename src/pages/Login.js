import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { history, setUserEmail } = this.props;
    const { email } = this.state;
    setUserEmail(email);
    history.push('/carteira');
  }

  render() {
    const SEIS = 6;
    const { email, password } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Email:
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="*******"
          />
        </label>

        <button
          type="button"
          disabled={
            password.length < SEIS || !email.includes('@') || !email.includes('.com')
          }
          onClick={ this.handleClick }
        >

          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (email) => dispatch(saveUserEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setUserEmail: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
