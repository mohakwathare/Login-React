// Loan Application results file.
import React from 'react';

class LoanApplicationResult extends React.Component {

  performLogout() {
    localStorage.removeItem('applicationResult');
    localStorage.removeItem('applicationStatus');
    localStorage.removeItem('loginData');
  }

  render() {
    const session = JSON.parse(localStorage.getItem('applicationResult'));
    return (
      <div>
        <h2>Your Loan to Value ratio is {session ? session["ration"] : this.props.location.state.ratio}</h2>
        <br/><br/><br/>
        <h3>{session ? session["message"] : this.props.location.state.message}</h3>
        <br/><br/>
        <a href="/login" onClick={this.performLogout}>Logout</a>
      </div>
    );
  }
}

export default LoanApplicationResult;
