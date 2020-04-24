import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';


function Search(props) {
  const [ state, setState ] = useState({
    text: '',
    removeAlert: false
  });

  let { showClearBtn, clearUsers, onChange, onSubmit } = props; // destructured props

  

  onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
      removeAlert: true
    })
    
    
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (state.text === '') {
      props.setAlert('Please enter something', 'light');
    } else {
      props.searchUsers(state.text);
      setState({
        text: ''
      })
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
    
      props.searchUsers(state.text);
      props.removeAlert(state.removeAlert);
    
  } */

  

    

    return (
      <div>
        <form onSubmit={onSubmit} >
          <input type="text" name="text" placeholder="Search Users..." value={state.text} onChange={onChange} />
          <input type="submit" value="Search" className="btn btn-dark btn-block" />
        </form>
        {showClearBtn && 
          <button className="btn btn-light btn-block" onClick={clearUsers} >Clear</button>
        } {/* && proverava true/false leve strane - nesto kao ternery operator */}

      </div>
    )
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
}



export default Search


