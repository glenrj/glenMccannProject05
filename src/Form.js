import React, { Component } from 'react';
import firebase from './firebase.js';


class Form extends Component {
    constructor() {
        super()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const dbRef = firebase.database().ref(`inProgress/${Story.state.activeStory}`);
        console.log(Story.state.activeStory);
    }


    render() {
        return (
            <form action="submit" onSubmit={this.handleSubmit}>
                <p>Submissions will be public.</p>
                <input type="text" name="author" id="" placeholder="Name"/>
                <input type="text" name="submission" id="" placeholder="What happens next?"/>
                <button type="submit">Add to the story</button>
            </form>
        )
    }
}

export default Form;