import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserItem(props) {
  const { login, avatar_url} = props.user;

  return (
    <div className="card text-center">
      <img src={avatar_url} alt="" className="round-img" style={{ width: '60px' }} />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className="btn dark btn-sm my-1">More</Link>
      </div>
    </div>
  )
}



export default UserItem
