import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Wallet from './pages/Wallet/Wallet.js';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/carteira" component={Wallet} />
      </Switch>
    );
  }
}

export default App;
