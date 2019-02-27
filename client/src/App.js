import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import makeAxios from './components/axios-config';

import LoginPage from './components/LoginPage';
import UsersList from './components/UsersList';

import './App.css';
import RegisterPage from './components/RegisiterPage';

class App extends Component {

  logout = e => {
    e.preventDefault();

    makeAxios()
      .get('/logout')
      .then( this.props.history.push('/'))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
      <nav>
        <button onClick={this.logout}>Logout</button>
        <button onClick={(e) => this.props.history.push('/')}>Home</button>
      </nav>
      <Route exact path = "/" component={LoginPage} />
      <Route path = "/users" component={UsersList} />
      <Route path = "/register" component={RegisterPage} />
      </div>
    );
  }
}

export default withRouter(App);
