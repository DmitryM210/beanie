import React, { Component } from 'react'

export class StartButton extends Component {
  
  start() {
    const duration = 1000;
    const fox = document.querySelector("#fox");
    const target = document.querySelector("#target");

    const first = fox.getBoundingClientRect();
    const last = target.getBoundingClientRect();

    const dx = last.left - first.left + 8;
    const dy = last.top - first.top + 8;

    fox.animate([
      { transform: `translate(${dx}px, ${dy}px)` },
    ], {
      duration: duration,
      iterations: 1,
      easing: "linear"
    });

    setTimeout(() => {
      fox.style.transform = `translate(${dx}px, ${dy}px)`;
    }, duration);
    
    // const codeField = document.querySelector('#code-field');
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ commands: codeField.innerHTML })
    // };
    // fetch('http://127.0.0.1:8000/handle', requestOptions)
    //     .then(response => response.json())
    //     .then(data => console.log({ postId: data.id }));
  }

  animateNextStep() {

  }

  render() {
    return (
        <button onClick={this.start} type="button" className="btn btn-success">Start</button>
    )
  }

}

export default StartButton