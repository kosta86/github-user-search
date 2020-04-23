import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class User extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.getUser(this.props.match.params.username);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }


  render() {

    const {
      login,
      name,
      avatar_url,
      html_url,
      followers_url,
      following_url,
      gists_url,
      organizations_url,
      repos_url,
      events_url,
      company,
      blog,
      location,
      emaill,
      hireable,
      bio,
      public_repos,
      public_gists,
      followers,
      following,
    } = this.props.user;

    const { loading } = this.props;

    if (loading) return <Spinner loading={loading} />

    return (
      <Fragment>
        <Link to="/" className="btn btn-light">Back To Search</Link>
        Hireable: {' '}
        {hireable ? <i className="fa fa-check success"></i> : <i className="fa fa-times-circle text-danger"></i>}
        
        <div className="card grid-2 my-1">
          <div className="all-center">
            <img src={avatar_url} alt="avatar" className="round-img" style={{width: '150px'}} />
            <h1>{name}</h1>
            <p>Location</p>
          </div>
        </div>
      </Fragment>
    )

}
}



export default User
