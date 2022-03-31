import PropTypes from 'prop-types';
import React from 'react';

class Wallet extends React.Component {
  render() {
    const { user, wallet } = this.props;
    return (
      <div>
        TrybeWallet
        <p>{user}</p>
        <p>{wallet}</p>
      </div>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  wallet: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Wallet;
