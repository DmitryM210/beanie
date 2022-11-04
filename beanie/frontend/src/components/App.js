import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment } from 'react';

import Header from './layout/Header';
import GameField from './layout/GameField';

// TODO make normal tabulation
export class App extends Component {
  render() {
    return (
      <div className="container-fluid h-100">
        <div className="h-100 d-flex flex-column">
          <Header />
          {/* TODO introduce <Fields /> component */}
          <div className="flex-grow-1 m-5 w-75">
            <div className="row row-cols-2 h-100">
              <GameField />
              <GameField />
            </div>
          </div>
          <footer className="p-3">Footer</footer>
        </div>
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React !!!
      //     </a>
      //   </header>
      // </div>
    )
  }
}

export default App;
