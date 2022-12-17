import './App.css';
import React, { Component } from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';
import LogoScreen from './LogoScreen';
import Environment from './Environment';

const levelsByUrl = {
  "/": 0,
  "/level/1/": 1,
  "/level/2/": 2
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: 0
    };
  }

  componentDidMount() {
    // console.log(window.location);
    const level = levelsByUrl[window.location.pathname];
    console.log(level);
    this.setState({ selectedLevel: level });
  }

  selectLevel() {
    // this.setState({ isLevelSelected: true });
    const url = new URL("level/1/", window.location.origin);
    window.location.href = url.href;
  }

  render() {
    const content = this.state.selectedLevel == 0 ?
      (<LogoScreen selectLevel={this.selectLevel.bind(this)} />) : 
      (<Environment />)
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
