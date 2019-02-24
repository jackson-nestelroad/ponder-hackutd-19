import React, { Component } from 'react'

import './ExportModal.css'

export default class ExportModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
        }
    }

    getVotes = data => {
        return Object.values(data.Votes).reduce((sum, bool) => sum += bool ? 1 : -1, 0);
    }

    componentWillMount = async () => {
        let exportedText = "";
        const snapshot = await this.props.firebase.getItems(this.props.session).once('value');
        const ideas = snapshot.val();
        const sortedIdeas = Object.keys(ideas).sort((a, b) => {
            return this.getVotes(ideas[b]) - this.getVotes(ideas[a]);
        });
        for(let key of sortedIdeas) {
            let votes = this.getVotes(ideas[key]);
            exportedText += `* ${ideas[key].Content} - ${ideas[key].Creator} (${votes} Votes)\n`;
        }

        this.setState({ content: exportedText });
    }

    handleChange = event => {
        this.setState({ content: event.target.value.trim() });
    }

    submit = () => {
        if(this.state.content.length > 0 && this.state.content.length <= 150) {
            this.props.handler(this.state.content);
        }
    }

    close = () => {
        this.props.handler(false);
    }

    render = () => {
        return (
            <div className='modal'>
                <div className='container'>
                    <button className='close' onClick={this.close}>-</button>
                    <textarea readOnly className='export' onChange={this.handleChange} value={this.state.content} />
                </div>
            </div>
        )
    }
}