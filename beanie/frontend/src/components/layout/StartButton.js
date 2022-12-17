import React, { Component } from 'react'

function _timeout(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function _commandsToJson() {
  const codeField = document.querySelector('#code-field');
  const commands = codeField.innerHTML
    .split(/<br>/).filter(element => element);
  return { "commands": commands };
}

async function _fetchPath() {
  const body = _commandsToJson();
  // console.log(body.commands.length);

  if (body.commands.length === 0) 
    return console.log("There are no commands!");

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  const url = new URL('level/handle/', window.location.href);
  return await fetch(url.href, requestOptions)
      .then(response => response.json())
      .then(data => data.path);
}

async function _animatePath(path, moveFunc) {
  moveFunc(0, 0);
  await _timeout(500);
  var [lastX, lastY] = [0, 0];
  for (const position of path) {
    const {x, y} = position;
    if (lastX === x && lastY === y) 
      continue;
    [lastX, lastY] = [x, y];
    await _animateMove(position);
    moveFunc(position.x, position.y);
    await _timeout(100);
  }
}

async function _animateMove(position) {
  const duration = 500;
  const fox = document.querySelector("#fox");

  const {x, y} = position;
  const targetId = `#c-${x}-${y}`;
  const target = document.querySelector(targetId);

  if (!target)
    return console.log("There is no target!");
  
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

export class StartButton extends Component {
  async animateMovement(moveFunc) {
    const path = await _fetchPath();
    await _animatePath(path, moveFunc);
  }

  render() {
    const animate = async () => 
      await this.animateMovement(this.props.moveCharacter);

    return (
      <div className="my-1 text-center">
        <button type="button" className="w-50 btn btn-success" onClick={animate}>
            Start
        </button>
      </div>
    )
  }
}

export default StartButton