import React, { Component } from 'react';

export class HomePage extends Component {
  render() {
    const redirect = this.props.redirect || "#";
    return (
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="m-4">
            <h1 className="display-1">beanie.</h1>
          </div>
          <a href={redirect} className="btn btn-primary p-0"> 
            <h2 className="mt-1 mx-5">Start</h2>
          </a>
        </div>
      </div>
    )
  }
}

export default HomePage;
