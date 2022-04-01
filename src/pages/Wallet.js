import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { user, wallet } = this.props;
    return (
      <div>
        TrybeWallet
        <p>{user.email}</p>
        <p>{wallet.wallet}</p>
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
