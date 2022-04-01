import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      wallet: {
      },
    };
  }

  componentDidMount = () => {
    const { walletToProps } = this.props;
    const { wallet } = this.state;

    walletToProps(wallet);
  }

  render() {
    const { user, wallet: { currencies } } = this.props;
    return (
      <div>
        TrybeWallet
        <section>
          <p data-testid="email-field">{user.email}</p>
          <p data-testid="total-field">0</p>
          <div data-testid="header-currency-field">BRL</div>
        </section>
        <form>
          <input type="number" data-testid="value-input" placeholder="Valor" />
          <input type="text" data-testid="description-input" placeholder="Descrição" />
          <label htmlFor="currency-input">
            Moeda
            <select data-testid="currency-input" id="currency-input">
              {
                currencies
                && currencies.map(
                  (currency) => <option key={ currency }>{currency}</option>,
                )
              }
            </select>
          </label>
          <label htmlFor="method-input">
            <select data-testid="method-input" id="method-input">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartaoCredito">Cartão de crédito</option>
              <option value="cartaoDebito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expenseTag">
            <select data-testid="tag-input">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
        <section />
      </div>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  walletToProps: PropTypes.func.isRequired,
  wallet: PropTypes.objectOf(PropTypes.array).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  walletToProps: (wallet) => dispatch(fetchCurrency(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
