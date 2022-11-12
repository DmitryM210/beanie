import React, { Component } from 'react'

export class StartButton extends Component {
  
  start() {
    const codeField = document.querySelector('#code-field');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commands: codeField.innerHTML })
    };
    fetch('http://127.0.0.1:8000/handle', requestOptions)
        .then(response => response.json())
        .then(data => console.log({ postId: data.id }));
  }

  render() {
    return (
        <button onClick={this.start} type="button" className="btn btn-success">Start</button>
    )
  }
}

export default StartButton