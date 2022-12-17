import React, { Component } from 'react';

export class LogoScreen extends Component {
  render() {
    return (
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="m-4">
            <h1>beanie.</h1>
          </div>
          <a href="#" className="btn btn-primary" 
            onClick={this.props.selectLevel}>
            Select level
          </a>
        </div>
      </div>
    )
  }
}

export default LogoScreen;
