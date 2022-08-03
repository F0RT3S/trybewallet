import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItems } from '../redux/actions';

// https://cursos.alura.com.br/forum/topico-aula-4-tags-thead-tbody-e-tfoot-29737#:~:text=Essas%20tags%20servem%20para%20que,independente%20do%20cabe%C3%A7alho%20e%20rodape. - Linha 26
class Table extends Component {
  handleClick = (itemId) => {
    const { remove } = this.props;
    remove(itemId);
  }

  render() {
    const { totalValue } = this.props;
    // console.log(totalValue);
    return (
      <div>
        <table style={ { tableLayout: 'fixed', width: 1000 } }>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            {
              totalValue.map((data, index) => (
                <tr
                  key={ index }
                >
                  <td>{data.description}</td>
                  <td>{data.tag}</td>
                  <td>{data.method}</td>
                  <td>{Number(data.value).toFixed(2)}</td>
                  {/* toFixed é por causa do teste do crypress */}
                  <td>{data.exchangeRates[data.currency].name}</td>
                  <td>{Number(data.exchangeRates[data.currency].ask).toFixed(2)}</td>
                  <td>
                    {
                      (Number(data.value)
                        * Number(data.exchangeRates[data.currency].ask))
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleClick(data.id) }
                      key={ data.id }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  totalValue: globalState.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (itemId) => dispatch(deleteItems(itemId)),
});

Table.propTypes = {
  totalValue: PropTypes.arrayOf(Object).isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
