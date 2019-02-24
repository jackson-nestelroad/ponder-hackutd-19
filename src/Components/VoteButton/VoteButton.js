import React, { Component } from 'react'

import './VoteButton.css'

export default class VoteButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            upvote: this.props.initial === true,
            downvote: this.props.initial === false
        }
    }

    upVote = () => { 
        let cache = !this.state.upvote;
        this.setState({ upvote: !this.state.upvote, downvote: false });
        this.sendBack(cache, false);
    }

    downVote = () => {
        let cache = !this.state.downvote;
        this.setState({ downvote: !this.state.downvote, upvote: false });
        this.sendBack(false, cache);
    }

    sendBack = (up, down) => {
        let bool = null;
        if(up)
            bool = true;
        else if(down)
            bool = false;

        this.props.handler(bool);
    }


    render = () => {
        return (
            <table className='btn-group'>
                <tbody>
                    <tr>
                        <td>
                            <button className={`up vote ${this.props.initial === true ? 'selected' : null}`} onClick={this.upVote}>&#8679;</button>
                            <span className='votes'>{this.props.votes}</span>
                            <button className={`down vote ${this.props.initial === false ? 'selected' : null}`} onClick={this.downVote}>&#8681;</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}