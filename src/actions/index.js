// Coloque aqui suas actions
import requestAPI from '../services/APIrequest';

export const USER = 'USER';
export const WALLET = 'WALLET';

export const userAction = (user) => ({ type: USER, user });
export const walletAction = (wallet) => ({ type: WALLET, wallet });

export function fetchCurrency() {
  return async (dispatch) => {
    try {
      const response = await requestAPI();
      delete response.USDT;
      dispatch(walletAction(response));
    } catch (error) {
      dispatch(error('errouuuuu'));
    }
  };
}
