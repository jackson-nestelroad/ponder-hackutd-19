import React, { Component } from 'react'
import FadeInOutGroup from './FadeInOutGroup'
import { FirebaseContext } from '../Firebase/index'

import Home from './Home'
import Session from './Session'

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            session: null,
            name: null,
            create: null
        }
    }

    setSession = (session, name, create) => {
        this.setState({
            session: session,
            name: name,
            create: create
        });
    }

    render = () => {
        if(!this.state.session) {
            return (
                <div id='app'>
                    <FadeInOutGroup>
                        <div key='home'>
                            <Home key={Math.random()} handler={this.setSession} />    
                        </div>
                    </FadeInOutGroup>
                </div>
            )
        }
        else {
            return (
                <div id='app'>
                    <FadeInOutGroup>
                        <div key='session'>
                            <FirebaseContext.Consumer>
                                {firebase => {
                                    return (
                                        <Session firebase={firebase} session={this.state.session} name={this.state.name} create={this.state.create} />
                                    )
                                }}
                            </FirebaseContext.Consumer>
                        </div>
                    </FadeInOutGroup>
                </div>
            )
        }
        // else {
        //     return (
        //         <Group session={this.session} />
        //     )
        // }
    }
}