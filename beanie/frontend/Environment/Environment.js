import React, { Component } from 'react';

import GameField from './GameField';
import CodeButtons from './CodeButtons';
import StartButton from './StartButton';
import CodeField from './CodeField';
import Modal from './Modal';
import { LevelContext } from '../Contexts/LevelContext';

const END_LEVEL_MESSAGE = 'Hey, you did it! Now you can go to the next level!';
const END_GAME_MESSAGE = 'Hey, you did it! You have completed all the levels!'

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
        modalHref: '',
        modalText: '',
    };
  }

  showModal(text, href) {
    this.setState({ modalHref: href, modalText: text });
    const modalElement = document.querySelector('#modal');
    var modal = new bootstrap.Modal(modalElement);
    if (text) modal.show();
  }

  moveCharacter(x, y) {
    this.setState({ hero: { x: x, y: y } });
  }

  endScript() {
    const { hero, exit } = this.state;
    if (!exit || hero.x != exit.x || hero.y != exit.y) 
      return;
    
    if (this.props.next)
      this.showModal(END_LEVEL_MESSAGE, this.props.next);
    else
      this.showModal(END_GAME_MESSAGE, this.props.next);
  }

  async componentDidMount() {
    const info = await _getLevelInfo();
    this.setState(info);
  }

  render() {
    const moveCharacter = (x, y) => this.moveCharacter(x, y);
    const endScript = () => this.endScript();
    const [href, text] = [this.state.modalHref, this.state.modalText];
    return (
      <LevelContext.Provider value={this.state}>
        <div className="h-100 w-100 m-0 mt-1 row row-cols-3">
          <CodeButtons /> 
          <CodeField />
          <GameField />
        </div>
        <StartButton moveCharacter={moveCharacter} endScript={endScript} />
        <Modal href={href} text={text} />
      </LevelContext.Provider>
    )
  }
}

export default Environment;
