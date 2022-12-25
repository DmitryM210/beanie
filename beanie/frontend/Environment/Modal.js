import React, { Component } from 'react'

export class Modal extends Component {
  render() {
    const [href, text] = [this.props.href, this.props.text];
    const button = href ? (
      <a type="button" className="btn btn-primary" href={href}>
        Next Level
      </a>
    ) : (
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    )
    return (
      <div id="modal" className="modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title">Modal title</h5> */}
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="h5">{text}</p>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              {button}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;