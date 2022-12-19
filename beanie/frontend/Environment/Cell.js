import React, { Component } from 'react'

function _image(filename) {
  const url = new URL(`static/${filename}`, window.location.origin);
  return url.href;
}

export class Cell extends Component {
  state = {
    size: 128,
    innerPadding: 16,
    keyIndex: 0,
  }

  images = {
    'hero': this.renderImage('fox', _image('fox.png')),
    'puddle': this.renderImage('puddle', _image('puddle.png')),
  }

  combined(...elements) {
    const contents = [];
    for (var i = 0; i < elements.length; i++) {
      const cls = i == elements.length-1 ? "col" : "col position-absolute";
      const key = `img-${this.state.keyIndex++}`;
      contents.push(<div key={key} className={cls}>{elements[i]}</div>);
    }
    return (<div className="row position-relative"> {contents} </div>)
  }

  renderImage(id, src) {
    return (
      <div id={id}>
        <img src={src} alt={id}
          width={this.state.size - this.state.innerPadding}
          height={this.state.size - this.state.innerPadding} />
      </div>
    )
  }

  renderCellWith(id, contents) {
    return (
      <div id={id} className="cell bg-light rounded border m-1 p-2
        d-flex justify-content-center align-items-center text-muted"
        style={{ width: this.state.size, height: this.state.size }}>
        {contents}
      </div>
    )
  }

  render() {
    const { id, tags } = this.props;
    if (!tags) return this.renderCellWith(id, '');
    
    const elements = tags.split(' ').map(tag => this.images[tag]);
    return this.renderCellWith(id, this.combined(...elements));
  }
}

export default Cell;
