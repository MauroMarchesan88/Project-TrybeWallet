// Coloque aqui suas actions
export const USER = 'USER';
export const WALLET = 'WALLET';
export const userAction = (user) => ({ type: USER, user });
export const walletAction = (wallet) => ({ type: WALLET, wallet });
