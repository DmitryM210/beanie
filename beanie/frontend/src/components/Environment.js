import React, { Component } from 'react';

import GameField from './layout/GameField';
import CodeButtons from './layout/CodeButtons';
import StartButton from './layout/StartButton';
import CodeField from './layout/CodeField';
import { LevelContext } from './contexts/LevelContext';

async function _getLevelInfo() {
  const requestOptions = { method: 'GET' };
  const url = new URL('level/1/info/', window.location.origin);
  return await fetch(url.href, requestOptions)
      .then(response => response.json())
      .then(data => data);
}

export class Environment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        size: { width: 0, height: 0 },
        hero: { x: 0, y: 0 },
        target: { x: 1, y: 1 }
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
