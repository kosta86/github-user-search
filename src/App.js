import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  /* async componentDidMount() {
    this.setState({
      loading: true
    })

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_OATHH_CLIENT_SECRET}`);

    this.setState({
      users: res.data,
      loading: false
    })
  } */

  // Search Github users
  searchUsers = async (query) => {
    this.setState({
      loading: true
    });

    const res = await axios.get(`https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_OATHH_CLIENT_SECRET}`);

    this.setState({
      users: res.data.items,
      loading: false
    });
  };

  // Get single Github User 
  getUser = async (username) => {
    this.setState({
      loading: true
    });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_OATHH_CLIENT_SECRET}`);

    this.setState({
      user: res.data,
      loading: false
    });
  };

  // Clear users from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type
      }
    });
  };

  // Remove alert
  removeAlert = (removeAlert) => {
    removeAlert && this.setState({
      alert: null
    });
  };



  render() {

    const { loading, users, user } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClearBtn={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                      removeAlert={this.removeAlert}
                    />
                    <Users
                      loading={loading}
                      users={users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:username' render={(props) => (
                <User {...props} user={user} getUser={this.getUser} />
                )} 
              />
            </Switch>

          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
