import React, { Component } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomePage from './HomePage/HomePage';
import Environment from './Environment/Environment';

// const levelsByUrl = {
//   "/": 0,
//   "/level/1/": 1,
//   "/level/2/": 2
// };

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: 0
    };
  }

  componentDidMount() {
    // console.log(window.location);
    const pattern = /\/level\/(?<level>[0-9]+)\//g
    const [match] = window.location.href.matchAll(pattern);
    const level = match?.groups?.level || 0;
    this.setState({ selectedLevel: level });
  }

  render() {
    const content = this.state.selectedLevel == 0 ?
      (<HomePage redirect="level/1/" />) : 
      (<Environment level={this.state.selectedLevel} />)
    return (
      <div className="w-100 h-100 d-flex flex-column" >
        <Header />
        {content}
        <Footer />
      </div>
    )
  }
}

export default App;
