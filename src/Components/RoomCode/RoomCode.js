import React, { Component } from 'react'

import './RoomCode.css'

export default class RoomCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render = () => {
        return (
            <div className='roomCode'>
                <span className='title'>CODE: </span>
                /{this.props.code}
            </div>
        )
    }
}