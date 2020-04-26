import React, { Fragment, useContext } from 'react';
import RepoItem from './RepoItem';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

function Repos(props) {
const githubContext = useContext(GithubContext);
  

  return (
    
    <Fragment>
      {githubContext.repos.map((repo) => (
        <RepoItem repo={repo} key={repo.name} />
      ))}
    </Fragment>

  )
}

Repos.propTypes = {

};

export default Repos

