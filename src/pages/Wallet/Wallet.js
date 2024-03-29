import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../../actions';
import { addExpense, updateExpenses } from '../../actions/addExpense';
import requestAPI from '../../services/APIrequest';
import './Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      id: 0,
    };
  }

  componentDidMount = () => {
    const { walletToProps, wallet: { expenses } } = this.props;
    walletToProps();
    const total = expenses.map(
      (expense) => expense.value * expense.exchangeRates[expense.currency].ask,
    );
    const somaTotal = total.length > 0 ? total[0] + total[1] : 0;
    this.setState({
      total: somaTotal,
    });
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
    this.setState({
      total: total + (valueToNumber * cambio),
      id: id + 1,
      value: 0,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleDelete = (expense) => {
    const { wallet: { expenses }, updExpense } = this.props;
    const { total } = this.state;
    const { id, currency, value, exchangeRates } = expense;
    const removeExpense = expenses.filter((row) => row.id !== id);
    updExpense(removeExpense);
    const removeValue = exchangeRates[currency].ask * value;
    this.setState({ total: total - removeValue });
  }

  render() {
    const { user, wallet: { currencies, expenses } } = this.props;
    const { total,
      value, description, currency, method, tag } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <section>
          <p data-testid="email-field" className="email">{user.email}</p>
          <p data-testid="total-field">{parseFloat(total).toFixed(2)}</p>
          <div data-testid="header-currency-field" className="currency">BRL</div>
        </section>
        <form>
          <input
            type="number"
            name="value"
            data-testid="value-input"
            placeholder="Valor"
            value={value}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={currency}
              onChange={this.handleChange}
            >
              {
                currencies
                && currencies.map(
                  (currcy) => <option key={currcy}>{currcy}</option>,
                )
              }
            </select>
          </label>
          <label htmlFor="method-input">
            <select
              data-testid="method-input"
              id="method-input"
              name="method"
              value={method}
              onChange={this.handleChange}
            >
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
              value={tag}
              onChange={this.handleChange}
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <table>
          <tbody>
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
            {
              expenses
              && expenses.map(
                (expense) => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{parseFloat(expense.value).toFixed(2)}</td>
                    <td>{expense.exchangeRates[expense.currency].name}</td>
                    <td>
                      {
                        parseFloat(
                          expense.exchangeRates[expense.currency].ask,
                        ).toFixed(2)
                      }
                    </td>
                    <td>
                      {
                        parseFloat(
                          expense.value * expense.exchangeRates[expense.currency].ask,
                        ).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={() => this.handleExpenseToProps(expense)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={() => this.handleDelete(expense)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ),
              )
            }
          </tbody>
        </table>
        <button
          type="button"
          onClick={this.handleExpenseToProps}
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
    currencies: PropTypes.arrayOf(PropTypes.object),
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  newExpenseToProps: PropTypes.func.isRequired,
  updExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  walletToProps: (wallet) => dispatch(fetchCurrency(wallet)),
  newExpenseToProps: (expenses) => dispatch(addExpense(expenses)),
  updExpense: (expenses) => dispatch(updateExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
