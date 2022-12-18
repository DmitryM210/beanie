import React, { Component } from 'react'

export class Header extends Component {
  render() {
    const homePageUrl = window.location.pathname === "/" ? 
      "#" : window.location.origin;
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light p-3 m-1 border-bottom">
        <a className="navbar-brand" href={homePageUrl}>beanie</a>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div> */}
      </nav>
    )
  }
}

export default Header;