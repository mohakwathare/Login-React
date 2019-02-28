//Express.js file for setting up the backend, REST API calls and DB connection.
// Importing required packages
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

var app = express();
// Implementing type in request body as json.
app.use(bodyParser.json());
app.use(cors());

// SQLite connection
let db = new sqlite3.Database('./zinqapp.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the zinqapp database.');
});

app.listen(2000, () => {
	console.log('CORS-enabled web server listening on port 2000');
});

app.get('/', (req, res) => {
	res.send("Hello from the other side.")
});

// REST API service for adding new user.
app.post('/addUser', (req, res) => {
	var user = req.body;
	var ADD_USER_QUERY = `INSERT INTO user_base VALUES('${user.username}','${user.password}','${user.firstname}','${user.lastname}','${user.dob}','${user.phone}','${user.email}')`;
	db.run(ADD_USER_QUERY, [], (err) => {
		if (err) {
			console.log(err);
	  		return res.send(err);
	  	}
	  	return res.send('Successfully added user.');
	});
});

// REST API service for checking if user is valid or not for login page.
app.post('/checkUserExists', (req, res) => {
	const CHECK_USER_EXISTS_QUERY = `SELECT username FROM user_base WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
	db.get(CHECK_USER_EXISTS_QUERY, [], (err, row) => {
		if (err) {
			console.log(err);
	  		return res.send(err);
	  	}
	  	// Check if we get any hit from the db for the user or not.
	  	var check = false;
		if(row) {
			check = true;
		}
		return res.json({
			data : check
		})
	});
});

// REST API service for adding new loadn application.
app.post('/addLoanApplication', (req, res) => {
	var application = req.body;
	// Defaults value for spouse income/expense variables.
	if (application.spouseAnnualInc === ''){
		application.spouseAnnualExp = 0;
		application.spouseAnnualInc = 0;
	}
	const ADD_LOAN_APPLICATION = `INSERT INTO loan_application VALUES('${application.postcode}','${application.propertyValue}','${application.deposit}','${application.annualIncome}','${application.annualExpense}','${application.spouseAnnualInc}','${application.spouseAnnualExp}')`;
	db.run(ADD_LOAN_APPLICATION, [], (err) => {
		if (err) {
			console.log(err);
	  		return res.send(err);
	  	}
	  	return res.send('Successfully added application. ');
	});
});