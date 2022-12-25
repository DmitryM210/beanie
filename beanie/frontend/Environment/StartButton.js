import React, { Component } from 'react'
import { LevelContext } from '../Contexts/LevelContext';

function _timeout(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export class StartButton extends Component {
  static contextType = LevelContext;

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
  }

  _commandsToJson() {
    const codeField = document.querySelector("#code-field");
    const commands = codeField.innerHTML
      .split(/<br>/).filter(element => element);
    return { "commands": commands };
  }
  
  _disableStartButton() {
    this.setState({ disabled: true });
  }
  
  _enableStartButton() {
    this.setState({ disabled: false });
  }
  
  async _fetchPath() {
    const body = this._commandsToJson();
    if (body.commands.length === 0)
      return console.log("There are no commands!");
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
  
    const url = new URL('handle/', window.location.href);
    return await fetch(url.href, requestOptions)
      .then(response => response.json())
      .then(data => data.path);
  }

  _getInitialHeroPosition() {
    if (this.state.initialHeroPosition)
      return this.state.initialHeroPosition;
    const position = this.context.hero;
    this.setState({
      initialHeroPosition: position
    });
    return position;
  }
  
  async _animatePath(path, moveFunc) {
    const initial = this._getInitialHeroPosition();
    var [lastX, lastY] = [initial.x, initial.y];
    moveFunc(lastX, lastY);
    await _timeout(500);
    for (const position of path) {
      const { x, y } = position;
      if (x < 0 && y < 0)
        return this._onCollision();
      if (lastX === x && lastY === y)
        continue;
      [lastX, lastY] = [x, y];
      await this._animateMove(position);
      moveFunc(position.x, position.y);
      await _timeout(100);
    }
  }
  
  _onCollision() {
    const fox = document.querySelector("#fox");
    fox.classList.add("bg-danger");
    console.log("Collision detected!");
  }
  
  async _animateMove(position) {
    const duration = 500;
    const fox = document.querySelector("#fox");
  
    const { x, y } = position;
    const targetId = `#c-${x}-${y}`;
    const target = document.querySelector(targetId);
  
    if (!target) console.log("There is no target!");
  
    const first = fox.getBoundingClientRect();
    const last = target.getBoundingClientRect();
  
    const dx = last.left - first.left + 8;
    const dy = last.top - first.top + 8;
  
    // console.log('animating ...');
    fox.animate([
      { transform: `translate(${dx}px, ${dy}px)` },
    ], {
      duration: duration,
      iterations: 1,
      fill: "forwards"
    });
  
    return _timeout(duration);
  }

  async animateMovement(moveFunc) {
    this._disableStartButton();
    const path = await this._fetchPath();
    if (path) await this._animatePath(path, moveFunc);
    this._enableStartButton();
    this.props.endScript();
  }

  render() {
    const animate = async () =>
      await this.animateMovement(this.props.moveCharacter);

    return (
      <div className="my-1 text-center">
        <button type="button" id="start-button"
          className="w-50 btn btn-success" onClick={animate}
          disabled={this.state.disabled}>
          Start
        </button>
      </div>
    )
  }
}

export default StartButton