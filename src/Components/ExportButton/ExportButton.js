import React, { Component } from 'react'

import './ExportButton.css'

export default class ExportButton extends Component {

    click = () => {
        this.props.handler();
    }

    render = () => {
        return (
            <div className='export-container'>
                <button className='export' onClick={this.click}>Export</button>
            </div>
        )
    }
}