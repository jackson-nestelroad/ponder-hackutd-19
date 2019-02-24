import app from 'firebase/app'
import config from './firebaseAuth.json'
import 'firebase/database'

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.database();
    }

    // Database API

    getSession = code => {
        return this.db.ref('Rooms').child(code);
    }

    getItems = session => {
        return this.db.ref(`Rooms/${session}`).child('Items');
    }

    getItem = (session, id) => {
        return this.db.ref(`Rooms/${session}/Items`).child(id);
    }

    updateIdeaVotes = (session, id, user, vote) => {
        return this.getItem(session, id).child('Votes').child(user).set(vote);
    }

    addUserToSession = (session, user) => {
        this.getSession(session).child('Users').child(user).set(true);
    }

    removeUserFromSession = async (session, user) => {
        await this.getSession(session).child('Users').child(user).set(null);
        let creator = await this.getSession(session).child('Creator').once('value');
        if(user === creator) {
            await this.getSession().set(null);
        }
    }

    addIdea = (session, user, content) => {
        let newID = this.getSession(session).child('Items').push().key;
        this.getSession(session).child('Items').child(newID).update({
            Content: content,
            Creator: user
        });
    }
}

export default Firebase;