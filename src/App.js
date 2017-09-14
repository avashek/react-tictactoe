import React, { Component } from 'react';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
//import './App.css';
import Calculator from './components/Calci/App.js';
import TTT from './components/tic-tac-toe/index.jsx'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/calci' component={Calculator} />
          <Route path='/tictactoe' component={TTT} />
        </div>
      </BrowserRouter>

    )
  }
}
export default App;
