// Routes file. Defines the specific route pages for each component.
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../Components/Home';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Welcome from '../Components/Welcome';
import LoanApplication from '../Components/LoanApplication';
import LoanApplicationResult from '../Components/LoanApplicationResult';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/signup" component={Signup} />
			<Route path="/welcome" component={Welcome} />
			<Route path="/loanapplication" component={LoanApplication} />
			<Route path="/loanapplicationresult" component={LoanApplicationResult} />
			<Route path="*" component={Error} />
		</Switch>
	</BrowserRouter>
);

export default Routes;