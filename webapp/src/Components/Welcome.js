// Welcome page route file.
import React from 'react';

class Welcome extends React.Component {

	constructor(props) {
		super(props);
		this.applyLoanSingle = this.applyLoanSingle.bind(this)
		this.applyLoanCouple = this.applyLoanCouple.bind(this)
		this.state = {
			isSingle:false
		};
		// console.log(JSON.parse(localStorage.getItem('loginData')));
	}

	applyLoanSingle() {
		const isSingle = this.state.isSingle ? this.state.isSingle : !this.state.isSingle;
		this.setState({isSingle : isSingle});
		const single = {isSingle : isSingle};
		localStorage.setItem('applicationStatus', JSON.stringify(single));
		this.props.history.push('/loanapplication',single);
	}

	applyLoanCouple() {
		const isSingle = this.state.isSingle ? !this.state.isSingle : this.state.isSingle;
		this.setState({isSingle : isSingle});
		const single = {isSingle : isSingle};
		localStorage.setItem('applicationStatus', JSON.stringify(single));
		this.props.history.push('/loanapplication',single);
	}

	performLogout() {
    	localStorage.removeItem('applicationResult');
    	localStorage.removeItem('applicationStatus');
    	localStorage.removeItem('loginData');
  	}

	render() {
		const session = JSON.parse(localStorage.getItem('loginData'));
		console.log(session);
		return (
			<div>
				<h2>Welcome, {session ? session["username"] : this.props.location.state.username}!</h2>
				<br/><br/>
				<h3>Loan Application Submission Portal</h3>
				<br/><br/>
				<div>
					<button onClick={this.applyLoanSingle}> Single Person Application </button> 
					<br/>
					<button onClick={this.applyLoanCouple}> Couple Application </button>
				</div>
				<br/><br/><br/>
				<a href="/login" onClick={this.performLogout}>Logout</a>
			</div>
		);
	}
}
export default Welcome;