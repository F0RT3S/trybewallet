import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    console.log(this.props);
    const { userEmail } = this.props;
    return (
      <header>
        <div data-testid="email-field">
          Olá,
          {' '}
          { userEmail }
        </div>
        <div data-testid="total-field">
          Despesa total: 0
        </div>

        <div data-testid="header-currency-field">
          BRL
        </div>

      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  userEmail: globalState.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);

/*
ESTADO GLOBAL

{
  user: {
    email: '',
  }
}
*/
