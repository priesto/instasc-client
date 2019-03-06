import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AccountListContainer from '../Containers/AccountListContainer';
import PostListContainer from '../Containers/PostListContainer';
import SettingsContainer from '../Containers/SettingsContainer';
import Sidebar from '../Components/Sidebar';
import Logout from '../Components/Logout';
import Spinner from '../Components/Spinner';

import axios from '../Api';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accounts: [],
      loading: true
    }

    this.updateAccounts = this.updateAccounts.bind(this);
  }

  updateAccounts(accounts) { this.setState({accounts}) }

  async componentDidMount() {
    const app_token = sessionStorage.getItem('app-token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${app_token}`;

    try {
      const response = await axios.get('/accounts'); 

      this.setState({
        accounts: response.data,
        loading: false
      })

    } catch (e) {
      console.error(e);
      this.setState({loading: false});
    }

  }

  // TODO: Changes applied on SettingsContainer must affect AccountListContainer.

  render() {
    const { loading } = this.state;

    if(loading) return <Spinner />

    return (
      <div className="App">
        <Sidebar />
        <div className="main">
          <AccountListContainer
            updateAccounts={this.updateAccounts}
            accounts={this.state.accounts}
          />
          <Route path="/app/account/*" component={PostListContainer} />
          <Route
            path="/app/settings"
            render={() => <SettingsContainer accounts={this.state.accounts} updateAccounts={this.updateAccounts} />}
          />
          <Route path="/app/logout" component={Logout} />
          <Route exact path="/app" render={() => (
            <div className="app-welcome">
              <h2>Select an account</h2>
              <p>Please choose an account from the list or add a new one to get started!</p>
            </div>
          )} />
        </div>
      </div>
    );
  }
}

export default App;