import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { user, wallet } = this.props;
    return (
      <div>
        TrybeWallet
        <p data-testid="email-field">{user.email}</p>
        <p>{wallet.wallet}</p>
        <div data-testid="total-field">0</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  wallet: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});
export default connect(mapStateToProps, null)(Wallet);
