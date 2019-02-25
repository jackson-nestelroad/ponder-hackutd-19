import React, { Component } from 'react'
import FadeInOutGroup from './FadeInOutGroup'
import IdeaList from '../Components/IdeaList/IdeaList'
import AddButton from '../Components/AddButton/AddButton'
import AddModal from '../Components/AddModal/AddModal'
import RoomCode from '../Components/RoomCode/RoomCode'
import BackButton from '../Components/BackButton/BackButton'
import ExportButton from '../Components/ExportButton/ExportButton'
import ExportModal from '../Components/ExportModal/ExportModal'

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

    handleExportButton = () => {
        if(!this.state.exportModal)
            this.setState({ exportModal: true });
    }

    handleBackButton = () => {
        window.location.reload();
    }

    exportClose = () => {
        this.setState({ exportModal: false });
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
                { this.state.exportModal ? <ExportModal {...this.props} handler={this.exportClose} /> : null}
                <BackButton handler={this.handleBackButton} />
                <ExportButton handler={this.handleExportButton} />
                <RoomCode code={this.props.session} />
                <IdeaList firebase={this.props.firebase} {...this.props} handler={this.callbackFromIdeas} />
                {/* <ManageButton handler={this.handleManageButton} />*/}
                <AddButton handler={this.handleAddButton} />
            </FadeInOutGroup>
        )

    }
}