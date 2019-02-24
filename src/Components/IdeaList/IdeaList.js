import React, { Component } from 'react'
// DIFFERENT ANIMATION CONTAINER HERE

import './IdeaList.css'

import Idea from '../Idea/Idea'

export default class IdeaList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ideas: []
        }
    }

    addUser = () => {
        this.props.firebase.addUserToSession(this.props.session, this.props.name);
    }

    removeUser = () => {
        this.props.firebase.removeUserFromSession(this.props.session, this.props.name);
    }

    componentWillMount = async () => {
        let stay = true;
        if(this.props.create) {
            let snapshot = await this.props.firebase.getSession(this.props.session).once('value');
            if(snapshot.val() !== null) {
                this.props.handler('Session already exists.');
                stay = false;
            }
            else {
                this.props.firebase.getSession(this.props.session).set({
                    Creator: this.props.name,
                    Items: false,
                    Users: {
                        [this.props.name]: true
                    }
                });
            }
        }
        else {
            let snapshot = await this.props.firebase.getSession(this.props.session).once('value');
            if(snapshot.val() === null || snapshot.val().Creator === undefined) {
                this.props.handler('Session does not exist.');
                stay = false;
            }
        }

        if(stay) {
            this.addUser();

            this.props.firebase.getSession(this.props.session).on('value', snapshot => {
                // console.log(snapshot.val());
                if(snapshot.val() === null) { 
                    this.props.handler('Room does not exist!');
                }
                else {
                    this.setState({ ideas: snapshot.val().Items });
                }
            });
    
            window.addEventListener('beforeunload', this.removeUser);
        }
    }

    componentWillUnmount = () => {
        // this.props.firebase.getSession(this.props.session).off('value');
        window.removeEventListener('beforeunload', this.removeUser);
    }

    updateIdea = (ideaID, vote) => {
        this.props.firebase.updateIdeaVotes(this.props.session, ideaID, this.props.name, vote);
    }

    calculateVotes = votes => {
        let total = 0;
        for(let vote in votes) { 
            total = total + (votes[vote] ? 1 : -1);
        }
        return total;
    }

    render = () => {
        if(!this.state.ideas || this.state.ideas.length === 0) {
            return (
                <div className='none'>No ideas posted yet!</div>
            )
        }
        else {
            return (
                <div className='idea-container'>
                    {Object.keys(this.state.ideas)
                        .sort((a, b) => {
                            return this.calculateVotes(this.state.ideas[b].Votes) - this.calculateVotes(this.state.ideas[a].Votes);
                        })
                        .map((idea, i) => 
                            <Idea 
                                key={Math.random()} 
                                name={this.props.name} 
                                object={this.state.ideas[idea]} 
                                id={idea} 
                                handler={this.updateIdea} />
                        )}
                </div>
            )
        }
    }
}