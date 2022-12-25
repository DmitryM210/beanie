import React, { Component } from 'react'

export class Header extends Component {
  renderLevelLink(level) {
    const levelHref = new URL(level.href, window.location.origin);
    return (
      <li key={level.name} className="nav-item">
        <a key={`link_${level.name}`} className="nav-link" href={levelHref}>
          {level.name}
        </a>
      </li>
    );
  }

  renderLevelLinks(levels) {
    const content = [];
    for (var level of levels) {
      content.push(this.renderLevelLink(level));
    }
    return content;
  };

  render() {
    const levels = this.props.levels;
    const homePageUrl = window.location.pathname === '/' ? 
      '#' : window.location.origin;
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light p-3 m-1 border-bottom">
        <a className="navbar-brand" href={homePageUrl}>beanie</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li> */}
            { this.renderLevelLinks(levels) }
            {/* <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li> */}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
