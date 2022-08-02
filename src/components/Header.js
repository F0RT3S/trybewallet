import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from './WalletForm';

class Header extends React.Component {
  render() {
    const { userEmail, totalValue } = this.props;
    console.log(totalValue);
    return (
      <header>
        <div data-testid="email-field">
          Olá,
          {' '}
          { userEmail }
        </div>
        <div data-testid="total-field">
          {
            totalValue.reduce((acc, currency) => (acc + parseFloat(currency.value)
              * parseFloat(currency.exchangeRates[currency.currency].ask)), 0).toFixed(2)
          }
        </div>

        <div data-testid="header-currency-field">
          BRL
        </div>

        <WalletForm />

      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  userEmail: globalState.user.email,
  totalValue: globalState.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalValue: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
