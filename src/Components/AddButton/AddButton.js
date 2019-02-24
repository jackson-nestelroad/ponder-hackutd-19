import React, { Component } from 'react'

import './AddButton.css'

export default class AddButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    click = () => {
        this.props.handler();
    }

    render = () => {
        return (
            <div className='add-container'>
                <button className='add' onClick={this.click}>+</button>
            </div>
        )
    }
}
