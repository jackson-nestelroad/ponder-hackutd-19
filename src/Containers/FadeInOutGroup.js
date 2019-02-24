import React, { Component } from 'react'
import { CSSTransitionGroup } from "react-css-transition";

import FadeInOut from './FadeInOut'

export default class FadeInOutGroup extends Component {

    render = () => {
        return (
            <CSSTransitionGroup {...this.props} transitionAppear={true}>
                {
                    React.Children.map(this.props.children, child => <FadeInOut>{child}</FadeInOut>)
                }
            </CSSTransitionGroup>
        )
    }
}