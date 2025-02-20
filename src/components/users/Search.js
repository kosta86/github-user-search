import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';


function Search(props) {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [ text, setText ] = useState('');

  const onChange = (e) => {

    setText(e.target.value);
    alertContext.removeAlert();

    if(e.target.value !== '') {
      githubContext.searchUsers(e.target.value);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  }


    return (
      <div>
        <form onSubmit={onSubmit} >
          <input type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange} />
          <input type="submit" value="Search" className="btn btn-dark btn-block" />
        </form>
        {githubContext.users.length > 0 && (
          <button className="btn btn-light btn-block" onClick={githubContext.clearUsers} >Clear</button>
        )} {/* && proverava true/false leve strane - nesto kao ternery operator */}

      </div>
    )
}


export default Search;


