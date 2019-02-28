// Login route file.
import React from 'react';
import axios from 'axios';
import './styles.css';
import FormValidation from './FormValidation';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.state = {
			username:'',
			password:'',
			formValues:[{fieldName:'username',value:''},{fieldName:'password',value:''}],
			formErrorsList:[],
			isFormValid:false
		};
	}

	updateList(fieldName, value) {
		var formValues = this.state.formValues;
		formValues.map(item => {
			if(item.fieldName === fieldName){
				item.value = value;
			}
		});
		return formValues;
	}

	handleStateChange = e => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name] : value,
			formValues: this.updateList(name, value)
		});
	}

	handleLogin = e => {
		e.preventDefault();
		var formValidation = new FormValidation();
		var errorState = formValidation.validateFormFields(this.state.formValues);
		this.setState({
			formErrorsList: errorState.errorList,
			isFormValid: errorState.isFormValid
		});
		var self = this;
		if (errorState.isFormValid) {
			// API call for checking if the inputted user is registered or not.
			axios.post('http://localhost:2000/checkUserExists',self.state)
			.then(response => {
				if (response.data.data) {
					localStorage.setItem('loginData', JSON.stringify(self.state));
					this.props.history.push('/welcome',self.state);
				} else {
					this.setState({
						formErrorsList : [...this.state.formErrorsList, "Invalid login credentials. Please try again."]
					});
			}
			})
			.catch(error => {
				if(error){
					console.log(error);
				}
			})
		}
	}

	render() {
		return (
			<div>
				<div className="errors">
					<ul>
        				{this.state.formErrorsList.map((error,ind) => 
        					<strong><li key={ind}>{error}</li></strong>)}
      				</ul>
				</div>
				<h2>Login Portal</h2>
				<form onSubmit={this.handleLogin}>
					<div>
						<input 
							type="text" 
							name="username" 
							placeholder="username" 
							onChange={this.handleStateChange}
						/>
					</div>
					<br/><br/>
					<div>
						<input 
							type="password" 
							name="password" 
							placeholder="password" 
							onChange={this.handleStateChange}
						/>
					</div>
					<br/><br/>
					<div>
						<button onClick={() => this.props.history.push('/signup')}> Create New Account </button>
						&nbsp;&nbsp;&nbsp;
						<button type="submit"> Login </button>
					</div>
				</form>
				<br/><br/>
				<a href="/">Home</a>
			</div>
		);
	}
}

export default Login;