import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';


function App() {



  /* state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }; */

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

  /* const [state, setState] = useState({
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  })
  console.log(state); */

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  /* useEffect(() => {
    setState({
      loading: true
    })

    const getUsers = async () => {
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_OATHH_CLIENT_SECRET}`);
      return res;
    }
    

    setState({
      users: getUsers().data,
      loading: false
    })
  }); */




  

  // Get single Github User 
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_OATHH_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false)
  };

  // Get users Repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_OATHH_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  };

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    });
  };

  // Remove alert
  const removeAlert = (removeAlert) => {
    removeAlert && setAlert(null);
  };



  /* const { loading, users, user, repos } = state; */

  return (
    <GithubState>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      clearUsers={clearUsers}
                      showClearBtn={users.length > 0 ? true : false}
                      showAlert={showAlert}
                      removeAlert={removeAlert}
                    />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:username' render={(props) => (
                <User {...props} user={user} getUser={getUser} loading={loading} getUserRepos={getUserRepos} repos={repos} />
              )}
              />
            </Switch>

          </div>
        </div>
      </BrowserRouter>
    </GithubState>
  );


}

export default App;
