//Home page route file.
import React from 'react';

class Home extends React.Component {

	render() {
		return (
			<div>
				<h2>Welcome to Zinq Solutions Home Page</h2>
				<button onClick={() => this.props.history.push('/signup')}> Create New Account </button>
				&nbsp;&nbsp;&nbsp;
				<button onClick={() => this.props.history.push('/login')}> Login </button><br/>
			</div>
		);
	}
}

export default Home;