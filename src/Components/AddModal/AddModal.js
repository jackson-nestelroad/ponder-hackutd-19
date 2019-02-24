import React, { Component } from 'react'

import './AddModal.css'

export default class AddModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
        }
    }

    handleChange = event => {
        this.setState({ content: event.target.value.trim() });
    }

    submit = () => {
        if(this.state.content.length > 0 && this.state.content.length <= 150) {
            this.props.handler(this.state.content);
        }
    }

    close = () => {
        this.props.handler(false);
    }

    render = () => {
        return (
            <div className='modal'>
                <div className='container'>
                    <button className='close' onClick={this.close}>-</button>
                    <textarea className='idea' maxLength={150} onChange={this.handleChange} placeholder='Share your brilliant idea or question!' />
                    <button className='submit' onClick={this.submit}>Submit</button>
                </div>
            </div>
        )
    }
}