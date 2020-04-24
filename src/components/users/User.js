import React, { useEffect, Fragment } from 'react';
import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function User(props) {
  /* componentDidMount() {
    this.props.getUser(this.props.match.params.username);
    this.props.getUserRepos(this.props.match.params.username);
  } */

  useEffect(() => {
    getUser(match.params.username);
    getUserRepos(match.params.username);
    // eslint-disable-next-line
  }, []) // empty array is passed in as a second argument which we can fill in with props so when passed props to array change then useEffect function fires,
         // ifempty array is passed in useEffect metod only runs once on page load(like on componentDidMount)

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
  } = props.user;

  const { loading, repos, getUser, getUserRepos, match } = props;

  if (loading) return <Spinner loading={loading} />

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">Back To Search</Link>
      Hireable: {' '}
      {hireable ? <i className="fa fa-check success"></i> : <i className="fa fa-times-circle text-danger"></i>}

      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} alt="avatar" className="round-img" style={{ width: '150px' }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio &&
            (<Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>)
          }
          <a href={html_url} className="btn btn-dark my-1" >Visit Github Profile</a>
          <ul>
            <li>
              <Fragment>
                <strong>Username: </strong> {login}
              </Fragment>
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <div className="card">
        <Repos repos={repos} />
      </div>
    </Fragment>
  )


}

User.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired


}

export default User;
