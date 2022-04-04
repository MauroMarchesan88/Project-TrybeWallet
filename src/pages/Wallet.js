import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';
import { addExpense } from '../actions/addExpense';
import requestAPI from '../services/APIrequest';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      id: 0,
    };
  }

  componentDidMount = () => {
    const { walletToProps } = this.props;
    walletToProps();
  }

  fetchCurrencyComplete = async () => {
    try {
      const response = await requestAPI();
      delete response.USDT;
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  handleExpenseToProps = async () => {
    const { newExpenseToProps } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      total,
      id,
    } = this.state;
    const exchangeRates = await this.fetchCurrencyComplete();
    const expense = { id, value, description, currency, method, tag, exchangeRates };
    newExpenseToProps(expense);
    const valueToNumber = Number(value);
    const cambio = exchangeRates[currency].ask;
    console.log(cambio);
    this.setState({
      total: total + (valueToNumber * cambio),
      id: id + 1,
      value: 0,
    });
  }

  handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { user, wallet: { currencies } } = this.props;
    const { total,
      value, description, currency, method, tag } = this.state;
    return (
      <div>
        TrybeWallet
        <section>
          <p data-testid="email-field">{user.email}</p>
          <p data-testid="total-field">{parseFloat(total).toFixed(2)}</p>
          <div data-testid="header-currency-field">BRL</div>
        </section>
        <form>
          <input
            type="number"
            name="value"
            data-testid="value-input"
            placeholder="Valor"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição"
            value={ description }
            onChange={ this.handleChange }
          />
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option value="" disabled>Escolha uma Moeda</option>
              {
                currencies
                && currencies.map(
                  (currcy) => <option key={ currcy }>{currcy}</option>,
                )
              }
            </select>
          </label>
          <label htmlFor="method-input">
            <select
              data-testid="method-input"
              id="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option disabled>Escolha um metodo</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select
              data-testid="tag-input"
              id="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option disabled>Escolha uma opção</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ this.handleExpenseToProps }
        >
          Adicionar despesa
        </button>
        <section />
      </div>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  walletToProps: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.array),
    expenses: PropTypes.string,
  }).isRequired,
  newExpenseToProps: PropTypes.func.isRequired,
  // total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  walletToProps: (wallet) => dispatch(fetchCurrency(wallet)),
  newExpenseToProps: (expenses) => dispatch(addExpense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
