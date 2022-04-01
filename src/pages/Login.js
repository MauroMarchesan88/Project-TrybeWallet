import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      sbmtEnabled: true,
      user: { email: '' },
    };
    this.handleclick = this.handleclick.bind(this);
  }

  handleclick = () => {
    const { userToProps } = this.props;
    const { user } = this.state;
    userToProps(user);
  }

  enableBtn = (event) => {
    const inputPsw = event.target.value;
    const inputEmail = event.target.previousSibling.value;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validateEmail = regex.test(inputEmail);
    const magicNumber = 6;
    return inputPsw.length >= magicNumber && validateEmail
      ? this.setState({
        sbmtEnabled: false,
        user: { email: inputEmail },
      })
      : this.setState({ sbmtEnabled: true });
  }

  render() {
    const { sbmtEnabled } = this.state;
    return (
      <form action="page_submission_URL" method="POST">
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          required
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          minLength="8"
          required
          onChange={ this.enableBtn }
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ this.handleclick }
            disabled={ sbmtEnabled }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userToProps: (user) => dispatch(userAction(user)),
});

Login.propTypes = {
  userToProps: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
