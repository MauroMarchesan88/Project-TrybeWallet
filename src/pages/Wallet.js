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
        <p data-testid="email-field">{user.email}</p>
        <div data-testid="total-field">0</div>
        <div data-testid="header-currency-field">BRL</div>
        <div>
          {
            currencies && currencies.map((currency) => <p key={ currency }>{currency}</p>)
          }
        </div>
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
