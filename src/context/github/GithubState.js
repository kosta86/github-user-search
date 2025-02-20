import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_OATHH_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_OATHH_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [], 
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Search Users
  const searchUsers = async (query) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/search/users?q=${query}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  };

  // Get single Github User 
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  };

  // Get users Repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_OATHH_CLIENT_SECRET}`);

    dispatch({
      type:GET_REPOS,
      payload: res.data
    })
  };

  // Clear Users from global state
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //Set Loading gif
  const setLoading = () => {
    dispatch({type: SET_LOADING});
  };



  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers: searchUsers,
        clearUsers:clearUsers,
        getUser: getUser,
        getUserRepos: getUserRepos
      }}>
      {props.children}
    </GithubContext.Provider>
  )

}

export default GithubState;