import React, { Component } from 'react'

import './CodeInput.css'

export default class CodeInput extends Component {

    constructor(props) {
        super(props);

        let generated = this.props.new ? new Array(6).fill(0).map(_ => String.fromCharCode(Math.floor(Math.random() * 25) + 65)).join('') : '';
        
        this.state = {
            value: generated
        }

        if(generated !== '')
            this.props.handler(generated);
    }

    handleChange = event => {
        this.props.handler(event.target.value.trim().toUpperCase());
        this.setState({ preset: false, value: event.target.value });
    }


    render = () => {
        return (
            <input type='text' value={this.state.value} className={`${this.props.title} ${this.props.error && this.props.error !== 'default' ? 'error' : null}`} spellCheck={false} placeholder='Code' maxLength={6} onChange={this.handleChange}></input>
        )
    }
}