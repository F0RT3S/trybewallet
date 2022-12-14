// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_CURRENCY':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'UPDATE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_ITEM':
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload),
    };

  default:
    return state;
  }
};

export default wallet;
