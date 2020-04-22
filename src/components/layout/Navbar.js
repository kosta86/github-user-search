import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Navbar(props) {

  const {icon, title} = props;

  return (
    <nav className="navbar bg-primary">
      <h1><i className={icon}></i> {title}</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

// satting default props if you dont pass in props from App.js
Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github'
};
//nesto kao typescript gde se unapred odredjuje tip prop-ova
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default Navbar
