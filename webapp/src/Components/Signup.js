// Signup page route file.
import React from 'react';
import axios from 'axios';
import FormValidation from './FormValidation';

class Signup extends React.Component {

	constructor(props) {
		super(props);
		this.createNewAccount = this.createNewAccount.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.state = {
			firstname:'',
			lastname:'',
			dob: new Date(),
			phone:'',
			email:'',
			username:'',
			password:'',
			confpassword:'',
			formValues:[{fieldName:'firstname',value:''},{fieldName:'lastname',value:''},
			{fieldName:'dob',value:new Date()},{fieldName:'phone',value:''},
			{fieldName:'email',value:''},{fieldName:'username',value:''},
			{fieldName:'password',value:''},{fieldName:'confpassword',value:''}],
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

	handleDateChange(date) {
		this.setState({
			dob:date
		});
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

	createNewAccount = e => {
		e.preventDefault();
		var formValidation = new FormValidation();
		var errorState = formValidation.validateFormFields(this.state.formValues);
		this.setState({
			formErrorsList: errorState.errorList,
			isFormValid: errorState.isFormValid
		});
		var self = this;
		console.log(errorState);
		if (errorState.isFormValid) {
			// Checks for blank fields.
			if (self.state.username && self.state.password && self.state.confpassword) {
				// Checks if both passwords match.
				if(self.state.password === self.state.confpassword){
					// Api call for adding new user.
					axios.post('http://localhost:2000/addUser', self.state)
					.then(response => {
						if(response.data.sqlMessage){
							alert('ERROR '+response.data.sqlMessage);
						} else{
							alert(response.data);
							this.props.history.push('/login');
						}
					})
					.catch(error => {
						if(error){
							alert("Could not add user because " + error);
						}
					})
				} else {
					alert("Passwords do not match. Please try again.")
				}
			} else {
				alert("Username or password fields are blank. Please check.")
			}
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
				<h2>Create Account</h2>
				<div>
					<input 
						type="text" 
						name="firstname" 
						placeholder="First Name" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="text" 
						name="lastname" 
						placeholder="Last Name" 
						onChange={this.handleStateChange} 
						required
					/>
					<br/>
					<input 
						type="date" 
						name="dob" 
						placeholder="Date of Birth" 
						onChange={this.handleDateChange} 
					/>
					<br/>
					<input 
						type="number" 
						name="phone" 
						placeholder="Phone Number" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="text" 
						name="email" 
						placeholder="Email Address" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="text" 
						name="username" 
						placeholder="Username" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="password" 
						name="password" 
						placeholder="password" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="password" 
						name="confpassword" 
						placeholder="confirm password" 
						onChange={this.handleStateChange} 
					/>
				</div>
				<br/><br/><br/><br/>
				<div>
					<button onClick={this.createNewAccount}> Create New Account </button>
				</div>
				<br/>
				<a href="/login">Already Have an Account?</a>
				<br/>
				<a href="/">Home</a>
			</div>
		);
	}
}

export default Signup;