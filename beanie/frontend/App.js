import React, { Component } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomePage from './HomePage/HomePage';
import Environment from './Environment/Environment';

async function _fetchLevels() {
  const requestOptions = { method: 'GET' };
  const url = new URL('levels/', window.location.origin);
  return await fetch(url.href, requestOptions)
      .then(response => response.json())
      .then(data => data.levels);
}

function _getLevelFromHref() {
  const pattern = /\/level\/(?<level>[0-9]+)\//g
  const [match] = window.location.href.matchAll(pattern);
  const level = match?.groups?.level || '0';
  return level;
}

export class App extends Component {
  constructor(props) {
    super(props);
    const level = _getLevelFromHref();
    this.state = {
      levels: [],
      selectedLevel: level
    };
  }

  async componentDidMount() {
    const levels = await _fetchLevels();
    // console.log(levels);
    this.setState({ levels: levels });
  }

  render() {
    const content = this.state.selectedLevel === '0' ?
      (<HomePage redirect="level/1/" />) : 
      (<Environment level={this.state.selectedLevel} />)
    return (
      <div className="w-100 h-100 d-flex flex-column">
        <Header levels={this.state.levels} />
        {content}
        <Footer />
      </div>
    )
  }
}

export default App;
