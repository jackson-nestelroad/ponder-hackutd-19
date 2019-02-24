import React, { Component } from 'react'

import './Idea.css'

import VoteButton from '../VoteButton/VoteButton'

export default class Idea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: this.props.object.Content,
            creator: this.props.object.Creator,
            votes: this.calculateVotes(this.props.object.Votes),
        }
    }

    getInitial = () => {
        if(this.props.object.Votes === undefined)
            return null;
        if(this.props.object.Votes[this.props.name] === true)
            return true;
        else if(this.props.object.Votes[this.props.name] === false)
            return false;
        else
            return null;
    }

    calculateVotes = votes => {
        let total = 0;
        for(let vote in votes) { 
            total = total + (votes[vote] ? 1 : -1);
        }
        return total;
    }

    handleVoteChange = val => {
        this.props.handler(this.props.id, val);
    }

    render = () => {
        return (
            <div className='idea'>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan='1' rowSpan='3' className='text'>{this.state.content}</td>
                            <td colSpan='1' rowSpan='2' className='button'>
                                <VoteButton initial={this.getInitial()} handler={this.handleVoteChange} votes={this.state.votes}/>
                            </td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td colSpan='1' rowSpan='1' className='creator'>{`- ${this.state.creator}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
