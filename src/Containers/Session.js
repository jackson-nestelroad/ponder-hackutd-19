import React, { Component } from 'react'
import FadeInOutGroup from './FadeInOutGroup'
import IdeaList from '../Components/IdeaList/IdeaList'
import AddButton from '../Components/AddButton/AddButton'
import AddModal from '../Components/AddModal/AddModal'
import RoomCode from '../Components/RoomCode/RoomCode'
import BackButton from '../Components/BackButton/BackButton'

export default class Session extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            addModal: false
        }
    }

    handleAddButton = () => {
        if(!this.state.addModal) 
            this.setState({ addModal: true });
    }

    addIdea = content => {
        if(content)
            this.props.firebase.addIdea(this.props.session, this.props.name, content);
        this.setState({ addModal: false });
    }

    callbackFromIdeas = error => {
        this.setState({ error: error });
    }

    render = () => {
        if(this.state.error) {
            return (
                <FadeInOutGroup>
                    <div className='error'>{this.state.error}</div>
                </FadeInOutGroup>   
            )
        }
        return (
            <FadeInOutGroup>
                { this.state.addModal ? <AddModal handler={this.addIdea} /> : null }
                <BackButton handler={this.handleBackButton} />
                <RoomCode code={this.props.session} />
                <IdeaList firebase={this.props.firebase} {...this.props} handler={this.callbackFromIdeas} />
                {/* <ManageButton handler={this.handleManageButton} />*/}
                <AddButton handler={this.handleAddButton} />
            </FadeInOutGroup>
        )

    }
}