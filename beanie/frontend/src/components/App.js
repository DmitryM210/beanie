import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment } from 'react';

import Header from './layout/Header';
import GameField from './layout/GameField';
import CodeButtons from './layout/CodeButtons';
import StartButton from './layout/StartButton';
import CodeField from './layout/CodeField';

// TODO make normal tabulation
export class App extends Component {
  render() {
    return (
      
        <div className="w-100 h-100 d-flex flex-column" >
          <Header />
          {/* TODO introduce <Fields /> component */}
          <div className="flex-grow-1" style={{ background: "red" }}>
            <div className="h-100 w-100 m-0 row row-cols-3">
              <div className="w-10"> <CodeButtons /> </div>
              <CodeField /> 
              <GameField />
              
            </div>
          </div>
          <StartButton />
          <footer >Footer</footer>
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
