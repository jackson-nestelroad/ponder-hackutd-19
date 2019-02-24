import React, { Component } from 'react'
import { CSSTransition, transit } from "react-css-transition";

CSSTransition.childContextTypes = {

}

export default class FadeInOut extends Component {

    render = () => {
        return (
            <CSSTransition 
                {...this.props}
                defaultStyle={{ opacity: 0 }}
                enterStyle={{ opacity: transit(1, 500, 'ease-in-out') }}
                leaveStyle={{ opacity: transit(0, 500, 'ease-in-out') }}
                activeStyle={{ opacity: 1 }}
            />
        )
    }
}