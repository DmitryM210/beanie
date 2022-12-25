import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';

export class CodeButtons extends Component {
    addCommand(command) {
        const codeField = document.querySelector('#code-field');
        codeField.append(command, document.createElement("br"));
    }

    renderButton(text) {
        return (
        <div className="w-100">
            <button type="button" className="btn btn-primary mb-1 w-100"
                onClick={() => this.addCommand(text)}>
                {text}
            </button>
        </div>
        );
    };
    
    render() {
        return (
        <div className="">
            { this.renderButton("Move") }
            { this.renderButton("Rotate Left") }
        </div>            
        )
    }
}

export default CodeButtons