var emailValidator = require('email-validator');
class FormValidation{

  constructor(){
    this.state = {
      isFormValid:true,
      errorList:[]
    };
  }

  setState(isFormValid, errorString){
    this.state.isFormValid = isFormValid;
    this.state.errorList.push(errorString)
  }

  validateLength(fieldName, value) {
    if (!value) {
      return fieldName + " cannot be blank";
    }else if (value.length < 3 && value.length > 0) {
      return fieldName + " cannot be less than 3 characters";
    } else if (value.length > 15) {
      return fieldName + " cannot be greater than 15 characters";
    }
  }

  validatePhoneNumber(value) {
    if (value.length !== 10) {
      return "Phone Number should be 10 characters.";
    }
  }

  validatePostCode(value){
    if (value.length !== 4 ){
      return "Postcode is invalid. Should be of 4 characters in length."
    }
  }

  validateAmounts(fieldName, value) {
    if (!value) {
      return fieldName + " cannot be blank.";
    } else if (value.length > 20) {
      return fieldName + " is invalid.";
    } 
  }

  validateForm(fieldName, value) {
    var errorString = '';
    switch(fieldName){
      case 'username':
      case 'password':
      case 'confpassword':
      case 'firstname':
      case 'lastname':
        errorString = this.validateLength(fieldName, value);
        if (errorString) {
          this.setState(false,errorString);
        } 
        break;
      case 'phone':
        errorString = this.validatePhoneNumber(value);
        if (errorString) {
          this.setState(false,errorString);
        } 
        break;
      case 'email':
        if (!emailValidator.validate(value)){
          this.setState(false,"Email is invalid");
        }
        break;
      case 'postcode':
        errorString = this.validatePostCode(value);
        if (errorString) {
          this.setState(false,errorString);
        } 
        break;
      case 'propertyValue':
      case 'deposit':
      case 'annualIncome':
      case 'annualExpense':
      case 'spouseAnnualInc':
      case 'spouseAnnualExp':
        errorString = this.validateAmounts(fieldName, value);
        if (errorString) {
          this.setState(false,errorString);
        } 
        break;
      default:
        break;
    }
  }

  validateFormFields(values){
    values.map(item => {
      this.validateForm(item.fieldName, item.value);
    });
    return this.state;
  }
}

export default FormValidation;