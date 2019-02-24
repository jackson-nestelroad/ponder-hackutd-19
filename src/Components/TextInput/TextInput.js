import React, { Component } from 'react'

import './TextInput.css'

export default class TextInput extends Component {

    handleChange = event => {
        this.props.handler(event.target.value.trim());
    }

    render = () => {
        return (
            <input className={`${this.props.title} ${this.props.error && this.props.error !== 'default' ? 'error' : null}`} placeholder={this.props.title} maxLength={30} onChange={this.handleChange}></input>
        )
    }
}