import React, { Component } from 'react'

export class Cell extends Component {
    state = {
        size: 128,
        innerPadding: 16
    }

    render() {
        switch (this.props.type) {
            case "fox":
                return (
                    <div className="cell bg-light rounded border m-1
                        d-flex justify-content-center align-items-center text-muted"
                        style={{ width: this.state.size, height: this.state.size }}>
                        
                        <div id="fox">
                        <img src="../static/frontend/fox.png"
                            className=""
                            alt="fox" 
                            width={this.state.size-this.state.innerPadding} 
                            height={this.state.size-this.state.innerPadding}/>
                        </div>
                    </div>
                )
            case "target":
                return (
                    <div id="target" className="cell bg-light rounded border m-1
                        d-flex justify-content-center align-items-center text-muted"
                        style={{ width: this.state.size, height: this.state.size }} >
                        target
                    </div>
                )
            case "cell":
            default:
                return (
                    <div className="cell bg-light rounded border m-1 p-2
                        d-flex justify-content-center align-items-center text-muted"
                        style={{ width: this.state.size, height: this.state.size }} >
                        cell
                    </div>
                )
        }
        
    }
}

export default Cell