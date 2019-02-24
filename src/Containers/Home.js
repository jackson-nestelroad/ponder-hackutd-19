import React, { Component } from 'react'

import FadeInOutGroup from '../Containers/FadeInOutGroup'

import Logo from '../Components/Logo/Logo'
import HomeButton from '../Components/HomeButton/HomeButton'
import TextInput from '../Components/TextInput/TextInput'
import CodeInput from '../Components/CodeInput/CodeInput'
import BackButton from '../Components/BackButton/BackButton'

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            buttonPressed: 'None',
            onSubmitPage: false,
            name: '',
            code: '',
            nameError: 'default',
            codeError: 'default'
        }

        document.addEventListener('keydown', this.handleEnterKey);
    }

    handleEnterKey = element => {
        if(this.state.onSubmitPage) {
            if(element.keyCode === 13) {
                this.pressEnter();
            }
        }
    }

    goodToSubmit = () => {
        return !this.state.nameError && !this.state.codeError;
    }

    pressEnter = () => {
        if(this.goodToSubmit()) {
            this.props.handler(this.state.code, this.state.name, this.state.buttonPressed === 'Create');
        }
    }

    pressButton = buttonPressed => {
        this.setState({ buttonPressed: buttonPressed });
        if(buttonPressed === 'Create' || buttonPressed === 'Join') {
            this.setState({ onSubmitPage: true });
        }
    }

    handleNameChange = input => {
        if(input === '')
            this.setState({ nameError: true });
        else
            this.setState({ nameError: false });

        this.setState({ name: input });
    }

    handleCodeChange = input => {
        if(input.length !== 6)
            this.setState({ codeError: true });
        else
            this.setState({ codeError: false });

        this.setState({ code: input });
    }

    handleBackButton = () => {
        window.location.reload();
    }

    render = () => {
        if(this.state.buttonPressed === 'None') { 
            return (
                <FadeInOutGroup>
                    <Logo />
                    <HomeButton className='home create' content='Create' handler={this.pressButton} />
                    <HomeButton className='home join' content='Join' handler={this.pressButton} />
                </FadeInOutGroup>
            )
        }
        if(this.state.buttonPressed === 'Create') {
            return (
                <FadeInOutGroup>
                    <Logo />
                    <BackButton handler={this.handleBackButton} />
                    <FadeInOutGroup>
                        <TextInput title='Name' error={this.state.nameError} handler={this.handleNameChange} />
                    </FadeInOutGroup>
                    <FadeInOutGroup>
                        <CodeInput title='Code' new={true} error={this.state.codeError} handler={this.handleCodeChange} />
                    </FadeInOutGroup>
                    <HomeButton className='home enter' content='Enter' handler={this.pressEnter} />
                </FadeInOutGroup>
            )
        }
        if(this.state.buttonPressed === 'Join') {
            return (
                <FadeInOutGroup>
                    <Logo />
                    <BackButton handler={this.handleBackButton} />
                    <FadeInOutGroup>
                        <TextInput title='Name' error={this.state.nameError} handler={this.handleNameChange} />
                    </FadeInOutGroup>
                    <FadeInOutGroup>
                        <CodeInput title='Code' new={false} error={this.state.codeError} handler={this.handleCodeChange} />
                    </FadeInOutGroup>
                    <HomeButton className='home enter' content='Enter' handler={this.pressEnter} />
                </FadeInOutGroup>
            )
        }
    }
}