import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllCurrency, fetchCurrency, saveValueExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      valueExpense: '',
      description: '',
      currencies: 'USD',
      method: 'Dinheiro',
      category: 'Alimentação',
      allObjExpense: {},
    };
  }

  componentDidMount() {
    const { fetchCurrencySuccess } = this.props;
    fetchCurrencySuccess();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.allObj);
  }

  // Função para adicionar todos meus itens do state dentro do objeto que também está no state e que vou enviar para minha action
  allObj = () => {
    const {
      valueExpense,
      description,
      currencies,
      method,
      category,
    } = this.state;

    const obj = { valueExpense, description, currencies, method, category };
    this.setState({ allObjExpense: obj });
    // console.log(allObjExpense); // Por esse log vi que tava chegando informação com lag, por isso na linha 28 chamo a função
  }

  handleClick = () => {
    const { fetchAllCurrencySucess } = this.props;
    const { allObjExpense } = this.state;
    fetchAllCurrencySucess(allObjExpense);
    // this.setState((prevState) => ({
    //   id: prevState.id + 1,
    // }));
  }

  render() {
    const { currency } = this.props;
    const { valueExpense, description, currencies, method, category } = this.state;
    return (
      <form>
        <label htmlFor="value-expense">
          <input
            data-testid="value-input"
            type="text"
            name="valueExpense"
            value={ valueExpense }
            onChange={ this.handleChange }
            placeholder="Valor da Despesa"
          />
        </label>

        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            placeholder="Descrição da despesa"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            name="currencies"
            value={ currencies }
            onChange={ this.handleChange }
          >
            {
              currency.map((coins, index) => (
                <option
                  value={ coins }
                  key={ index }
                  onChange={ this.handleChange }
                >
                  { coins }
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="currency-method">
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartao de crédito">Cartão de crédito</option>
            <option value="Cartao de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category-expense">
          <select
            data-testid="tag-input"
            name="category"
            value={ category }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencySuccess: () => dispatch(fetchCurrency()),
  fetchAllCurrencySucess: (value) => dispatch(fetchAllCurrency(value)),
  valueExpenseProps: (value) => dispatch(saveValueExpense(value)),
});

const mapStateToProps = (globalState) => ({
  currency: globalState.wallet.currencies,
});

WalletForm.propTypes = {
  fetchCurrencySuccess: PropTypes.arrayOf(PropTypes.string).isRequired,
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
