import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';


function Search(props) {
  const githubContext = useContext(GithubContext)

  const [ text, setText ] = useState('');
  /* const [ alert, setAlert ] = useState(false); */

  const { showClearBtn, clearUsers, showAlert, removeAlert } = props; // destructured props


  const onChange = (e) => {
    
    setText(e.target.value);
    removeAlert(true);
    if(e.target.value !== '') {
      githubContext.searchUsers(e.target.value);
    }
    
    
    
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      showAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
    
  }


  /* componentDidUpdate(prevProps, prevState) {
    if (prevState.text !== state.text && state.text !== '') {
      props.searchUsers(state.text);
      props.removeAlert(state.removeAlert);
    }

  } */

  /* const refHook = useRef(false);
  
  if (refHook.current) {
    
      searchUsers(state.text);
      removeAlert(state.removeAlert);
    
  } */




  

  

    

    return (
      <div>
        <form onSubmit={onSubmit} >
          <input type="text" name="text1" placeholder="Search Users..." value={text} onChange={onChange} />
          <input type="submit" value="Search" className="btn btn-dark btn-block" />
        </form>
        {showClearBtn && 
          <button className="btn btn-light btn-block" onClick={clearUsers} >Clear</button>
        } {/* && proverava true/false leve strane - nesto kao ternery operator */}

      </div>
    )
}

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired
}



export default Search


