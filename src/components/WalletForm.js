import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { fetchCurrencySuccess } = this.props;
    console.log(fetchCurrencySuccess());
  }

  render() {
    const { currency } = this.props;
    return (
      <form>
        <label htmlFor="expanseAmount">
          <input
            data-testid="value-input"
            type="text"
            name="expanseAmount"
            placeholder="Valor da Despesa"
          />
        </label>

        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            placeholder="Descrição da despesa"
          />
        </label>

        <label htmlFor="currency">
          <select data-testid="currency-input">
            {
              currency.map((coins, index) => (
                <option
                  value={ coins }
                  key={ index }
                >
                  { coins }
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="currency-method">
          <select data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartaoCredito">Cartão de crédito</option>
            <option value="cartaoDebito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category-expense">
          <select data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencySuccess: () => dispatch(fetchCurrency()),
});

const mapStateToProps = (globalState) => ({
  currency: globalState.wallet.currencies,
});

WalletForm.propTypes = {
  fetchCurrencySuccess: PropTypes.arrayOf(PropTypes.string).isRequired,
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
