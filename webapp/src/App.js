import React, { Component } from 'react';
import './Components/styles.css';
import Routes from './Routes/routes';

class App extends Component {
  render() {
    return (
      <div>
      	<div className='topdiv'>
        	<h1>Zinq Solutions</h1>
        </div>
        <div className='content'>
        <br/><br/><br/>
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
