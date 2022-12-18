import { React, Component, useContext } from 'react';
import { LevelContext } from '../Contexts/LevelContext';
import Cell from './Cell';

export class GameField extends Component {
  static contextType = LevelContext;

  constructor(props) {
    super(props);
    this.state = {
      keyIndex: 0
    }
  }

  renderSplitter() {
    return (<div key={this.state.keyIndex++} className="w-100"></div>);
  };

  renderCellAt(x, y) {
    var { hero, target } = this.context;
    var id = `c-${x}-${y}`, type = "cell";
    if (x === hero.x && y === hero.y)
      type = "fox";
    else if (x === target.x && y === target.y)
      type = "target";
    return (
      <div key={this.state.keyIndex++} className="col">
        <Cell key={this.state.keyIndex++} id={id} type={type} />
      </div>
    );
  };

  renderField(width, height) {
    const content = [];
    for (var y = height - 1; y >= 0; y--) {
      for (var x = 0; x < width; x++) {
        content.push(this.renderCellAt(x, y));
      }
      content.push(this.renderSplitter());
    }
    return content;
  };

  render() {
    if (!this.context) return;

    // TODO: prevent redrawing
    // console.log("field redraw !!");
    return (
      <div className="container">
        <div className="row">
          {this.renderField(this.context.size.width, this.context.size.height)}
        </div>
      </div>
    )
  }
}

export default GameField