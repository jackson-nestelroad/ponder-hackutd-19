import React from 'react'
import ReactDOM from 'react-dom'
import App from './Containers/App'
import Firebase, { FirebaseContext } from './Firebase/index'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>, document.getElementById('react'));
