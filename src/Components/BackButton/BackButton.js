import React, { Component } from 'react'

import './BackButton.css'

export default class BackButton extends Component {

    click = () => {
        this.props.handler();
    }

    render = () => {
        return (
            <div className='back' onClick={this.click}></div>
        )
    }
}