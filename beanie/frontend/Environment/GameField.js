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

  getCellTags(x, y) {
    const { hero, objects } = this.context;
    
    const hasHero = x == hero.x && y == hero.y;
    const hasPuddle = objects[`${x},${y}`]?.includes('Puddle');
    const hasExit = objects[`${x},${y}`]?.includes('Exit');
    
    var tags = ''
    if (hasHero)   tags += 'hero';
    if (hasPuddle) tags += ' puddle';
    if (hasExit)   tags += ' exit';

    return tags;
  }

  renderSplitter() {
    return (<div key={this.state.keyIndex++} className="w-100"></div>);
  };

  renderCellAt(x, y) {
    const id = `c-${x}-${y}`;
    const tags = this.getCellTags(x, y);
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