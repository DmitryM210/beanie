import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment } from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';
import GameField from './layout/GameField';
import CodeButtons from './layout/CodeButtons';
import StartButton from './layout/StartButton';
import CodeField from './layout/CodeField';
import { LevelContext } from './contexts/LevelContext';

async function _getLevelInfo() {
  const requestOptions = { method: 'GET' };
  const url = new URL('level/1/info/', window.location.href);

  return await fetch(url.href, requestOptions)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        return data;
      });
}

// TODO make normal tabulation
export class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          size: { width: 0, height: 0 },
          hero: { x: 0, y: 0 },
          target:  { x: 1, y: 1 }
      };  
  }

  moveCharacter(x, y) {
    this.setState({ hero: { x: x, y: y} });
  }

  async componentDidMount() {
    const info = await _getLevelInfo();
    // console.log(this.state);
    this.setState(info);
  }

  render() {
    return (
        <div className="w-100 h-100 d-flex flex-column" >
          <Header />
          <LevelContext.Provider value={this.state}>
            <div className="h-100 w-100 m-0 mt-1 row row-cols-3">
              <CodeButtons /> 
              <CodeField />
              <GameField />
            </div>
            <StartButton moveCharacter={(x, y) => this.moveCharacter(x, y)} />
          </LevelContext.Provider>
          <Footer />
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
