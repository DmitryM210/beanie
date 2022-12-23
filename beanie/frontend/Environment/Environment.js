import React, { Component } from 'react';

import GameField from './GameField';
import CodeButtons from './CodeButtons';
import StartButton from './StartButton';
import CodeField from './CodeField';
import { LevelContext } from '../Contexts/LevelContext';

async function _getLevelInfo() {
  const requestOptions = { method: 'GET' };
  const url = new URL('info/', window.location.href);
  return await fetch(url.href, requestOptions)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log('Error:', error));
}

export class Environment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        size: { width: 0, height: 0 },
        hero: { x: 0, y: 0 },
        // puddle: { x: 0, y: 0 }
    };  
  }

  moveCharacter(x, y) {
    this.setState({ hero: { x: x, y: y} });
  }

  async componentDidMount() {
    const info = await _getLevelInfo();
    this.setState(info);
  }

  render() {
    const moveCharacter = (x, y) => this.moveCharacter(x, y);
    return (
      <LevelContext.Provider value={this.state}>
        <div className="h-100 w-100 m-0 mt-1 row row-cols-3">
          <CodeButtons /> 
          <CodeField />
          <GameField />
        </div>
        <StartButton moveCharacter={moveCharacter} />
      </LevelContext.Provider>
    )
  }
}

export default Environment;
