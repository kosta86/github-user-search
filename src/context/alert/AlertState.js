import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';


function AlertState(props) {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        msg: msg,
        type: type
      }
    });
  };

  // Remove alert
  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT,
    });
  };


  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert: setAlert,
        removeAlert: removeAlert
      }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;
