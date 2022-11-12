import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';

export class CodeButtons extends Component {

    addCommand(command) {
        const codeField = document.querySelector('#code-field');
        const commandBlock = (
            <div>
                <p> {command} </p>
            </div>
        );
        const commandBlockDiv = React.createElement(codeField, commandBlock);
        codeField.append(command, document.createElement("br"));
    }
    
    render() {
        return (
            
                <div className="btn-group-vertical" style={{ background: 'grey' }}>
                    <button onClick={() => this.addCommand("Move")} type="button" className="btn btn-primary"> Move </button>
                    <button onClick={() => this.addCommand("Rotate Left")} type="button" className="btn btn-primary">Rotate Left</button>
                </div>
            
        )
    }
}

export default CodeButtons