// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions/index';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    console.log(action.value);
    return { user: action.value };
  default:
    return state;
  }
};

export default user;
