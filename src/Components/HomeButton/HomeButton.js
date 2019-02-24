import React, { Component } from 'react'

import './HomeButton.css'

export default class HomeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    click = () => {
        this.props.handler(this.props.content);
    }

    render = () => {
        return (
            <div className="buttonBlock">
                <button className={this.props.className} onClick={this.click}>{this.props.content}</button>
            </div>
        )
    }
}