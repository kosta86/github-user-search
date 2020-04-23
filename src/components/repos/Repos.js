import React, { Fragment } from 'react';
import RepoItem from './RepoItem';
import PropTypes from 'prop-types';

function Repos(props) {

  

  return (
    
    <Fragment>
      {props.repos.map((repo) => (
        <RepoItem repo={repo} key={repo.name} />
      ))}
    </Fragment>

  )
}

Repos.propTypes = {

};

export default Repos

