// Loan Application route file.
import React from 'react';
import axios from 'axios';
import FormValidation from './FormValidation';

class LoanApplication extends React.Component {

	constructor(props) {
		super(props);
		this.submitLoanApp = this.submitLoanApp.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.state = {
			postcode:'',
			propertyValue:'',
			deposit:'',
			annualIncome:'',
			annualExpense:'',
			spouseAnnualInc:'',
			spouseAnnualExp:'',
			formValues:[{fieldName:'postcode',value:''},{fieldName:'propertyValue',value:''},
			{fieldName:'deposit',value:''},{fieldName:'annualIncome',value:''},
			{fieldName:'annualExpense',value:''},{fieldName:'spouseAnnualInc',value:''},
			{fieldName:'spouseAnnualExp',value:''}],
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

	removeCoupleFields() {
		var formValues = this.state.formValues;
		formValues.pop();
		formValues.pop();
		return formValues;
	}

	submitLoanApp = e => {
		e.preventDefault();
		const session = JSON.parse(localStorage.getItem('applicationStatus'));
		if (session ? session["isSingle"] : this.props.location.state.isSingle) {
			this.state.formValues = this.removeCoupleFields()
		}
		var formValidation = new FormValidation();
		var errorState = formValidation.validateFormFields(this.state.formValues);
		this.setState({
			formErrorsList: errorState.errorList,
			isFormValid: errorState.isFormValid
		});
		var self = this;
		if (errorState.isFormValid) {
			// Variable for finding the ratio for loan grant decision.
			const x = (self.state.deposit/self.state.propertyValue).toFixed(2);
			var message = "Great, we can help you obtain the loan!! Your application has been submitted.";
			if (x >= 0.2) {
				// API call for adding the loan appliation in the database.
				axios.post('http://localhost:2000/addLoanApplication', self.state)
				.then(response => {
					if (response.data.sqlMessage) {
						this.setState({
							formErrorsList : [...this.state.formErrorsList, 'ERROR '+response.data.sqlMessage]
						});
					} else {
						alert(response.data);
					}
				})
				.catch(error => {
					if(error){
						console.log(error);
					}
				})
			} else {
				message = "Your loan to value ratio is low. Please give our office a call for furthur assistance.";
			}
			const result = {
				ratio : x, 
				message : message
			};
			// Routes to loan application results page.
			localStorage.setItem('applicationResult', JSON.stringify(result));
			this.props.history.push('/loanapplicationresult',result);
		}
	}

	performLogout() {
    	localStorage.removeItem('applicationResult');
    	localStorage.removeItem('applicationStatus');
    	localStorage.removeItem('loginData');
  	}

	render() {
		const session = JSON.parse(localStorage.getItem('applicationStatus'));
		console.log(session);
		return (
			<div>
				<div className="errors">
					<ul>
        				{this.state.formErrorsList.map((error,ind) => 
        					<strong><li key={ind}>{error}</li></strong>)}
      				</ul>
				</div>
				<h2>Loan Application Form</h2>
				<div>
					<input 
						type="number" 
						name="postcode" 
						placeholder="Postcode of Property" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="number" 
						name="propertyValue" 
						placeholder="Property Value" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="number" 
						name="deposit" 
						placeholder="Deposit" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="number" 
						name="annualIncome" 
						placeholder="Annual Income" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					<input 
						type="number" 
						name="annualExpense" 
						placeholder="Annual Expenses" 
						onChange={this.handleStateChange} 
					/>
					<br/>
					{ (session ? !session["isSingle"] : !this.props.location.state.isSingle) && 
						<input 
							type="number" 
							name="spouseAnnualInc" 
							placeholder="Spouse Annual Income" 
							onChange={this.handleStateChange} 
						/> 
					}
					{ (session ? !session["isSingle"] : !this.props.location.state.isSingle) && <br/> }
					{ (session ? !session["isSingle"] : !this.props.location.state.isSingle) && 
						<input 
							type="number" 
							name="spouseAnnualExp" 
							placeholder="Spouse Annual Expenses" 
							onChange={this.handleStateChange} 
						/> 
					}
				</div>
				<br/><br/><br/>
				<div>
					<button onClick={this.submitLoanApp}> Submit Application </button>
				</div>
				<br/><br/>
				<a href="/login" onClick={this.performLogout}>Logout</a>
			</div>
		);
	}
}
export default LoanApplication;