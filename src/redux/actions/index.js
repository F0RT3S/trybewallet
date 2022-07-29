// Coloque aqui suas actions
export const saveUserEmail = (email) => ({
  type: 'SET_USER_EMAIL',
  payload: email,
});

export const currenciesList = (coins) => ({
  type: 'FETCH_CURRENCY',
  payload: coins,
});

export const fetchCurrency = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    console.log(result);
    const bife = Object.keys(result);
    const bife2 = bife.filter((coin) => coin !== 'USDT');
    dispatch(currenciesList(bife2));
  } catch (error) {
    console.log(error);
  }
};
