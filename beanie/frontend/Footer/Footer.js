import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        const homePageUrl = window.location.pathname === '/' ? 
          '#' : window.location.origin;

        return (
        <footer className="d-flex flex-wrap justify-content-between 
            align-items-center p-3 m-1 border-top bg-light">
            <p className="col-md-4 mb-0 text-muted">© 2022 Company, Inc</p>
            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a href={homePageUrl} className="nav-link px-2 text-muted">Home</a></li>
                <li className="nav-item"><a href="/credits/" className="nav-link px-2 text-muted">Credits</a></li>
            </ul>
        </footer>
        )
    }
}

export default Footer