import React, { Component } from 'react'

import './Logo.css'

export default class Logo extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render = () => {
        return (
            <div className="logo">
                <div className="text">P</div>
                <div className="image"></div>
                <div className="text">nder</div>
            </div>
        )
    }
}