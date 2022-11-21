import React, { Component } from 'react'
import Cell from './Cell'

export class GameField extends Component {
    render() {
        return (
        <div className="container" style={{ background: 'gray' }}>
            <div className="row">

                <div className="col"> <Cell/> </div>
                <div className="col"> <Cell/> </div>

                <div className="w-100"></div>

                <div className="col"> <Cell type="fox"/> </div>
                <div className="col"> <Cell/> </div>

                <div className="w-100"></div>

                <div className="col"> <Cell/> </div>
                <div className="col"> <Cell type="target"/> </div>

            </div>
        </div>
        )
    }
}

export default GameField