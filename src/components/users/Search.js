import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Search extends Component {
  state = {
    text: '',
    removeAlert: false
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      removeAlert: true
    })
    
    
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({
        text: ''
      })
    }
    
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.text !== this.state.text && this.state.text !== '') {
      this.props.searchUsers(this.state.text);
      this.props.removeAlert(this.state.removeAlert);
    }

  }

  render() {

    const { showClearBtn, clearUsers } = this.props; // destructured props

    return (
      <div>
        <form onSubmit={this.onSubmit} >
          <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.onChange} />
          <input type="submit" value="Search" className="btn btn-dark btn-block" />
        </form>
        {showClearBtn && 
          <button className="btn btn-light btn-block" onClick={clearUsers} >Clear</button>
        } {/* && proverava true/false leve strane - nesto kao ternery operator */}

      </div>
    )
  }
}



export default Search
