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
    const { hero, objects } = this.context;
    const id = `c-${x}-${y}`;

    const hasHero = x == hero.x && y == hero.y;
    const hasPuddle = objects[`${x},${y}`]?.includes('Puddle');
    const tags = `${hasHero ? 'hero' : ''}` + `${hasPuddle ? ' puddle' : ''}`;
    
    return (
      <div key={this.state.keyIndex++} className="col">
        <Cell key={this.state.keyIndex++} id={id} tags={tags} />
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
    const width = this.context.size.width;
    const height = this.context.size.height;

    // TODO: prevent redrawing
    // console.log("field redraw !!");
    return (
      <div className="container">
        <div className="row">
          { this.renderField(width, height) }
        </div>
      </div>
    )
  }
}

export default GameField