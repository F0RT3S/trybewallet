// Coloque aqui suas actions
export const saveUserEmail = (email) => ({
  type: 'SET_USER_EMAIL',
  payload: email,
});

export const currenciesList = (coins) => ({
  type: 'FETCH_CURRENCY',
  payload: coins,
});

export const saveValueExpense = ({
  valueExpense, description, currencies, method, category,
}, exchangeRates) => ({
  type: 'UPDATE_EXPENSE',
  payload: { valueExpense, description, currencies, method, category, exchangeRates },
});

export const fetchAllCurrency = (result) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    dispatch(saveValueExpense(result, exchangeRates));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrency = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    const bife = Object.keys(result);
    const bife2 = bife.filter((coin) => coin !== 'USDT');
    dispatch(currenciesList(bife2));
  } catch (error) {
    console.log(error);
  }
};
