import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment } from 'react';

import Header from './layout/Header';
import GameField from './layout/GameField';
import CodeButtons from './layout/CodeButtons';
import StartButton from './layout/StartButton';
import CodeField from './layout/CodeField';
import { LevelContext } from './contexts/LevelContext';

// TODO make normal tabulation
export class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          size: { width: 2, height: 3 },
          start: { x: 0, y: 0 },
          target:  { x: 1, y: 1 }
      };  
  }

  moveCharacter(x, y) {
    this.setState({ start: { x: x, y: y} });
  }

  render() {
    return (
        <div className="w-100 h-100 d-flex flex-column" >
          <Header />
          <LevelContext.Provider value={this.state}>
            {/* TODO introduce <Fields /> component */}
            <div className="flex-grow-1">
              <div className="h-100 w-100 m-0 row row-cols-3">
                <div className="w-10"> <CodeButtons /> </div>
                <CodeField /> 
                <GameField />
              </div>
            </div>
            <StartButton moveCharacter={(x, y) => this.moveCharacter(x, y)} />
          </LevelContext.Provider>
          <footer>Footer</footer>
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
