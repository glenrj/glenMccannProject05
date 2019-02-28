import React, { Component } from 'react';
import firebase from './firebase.js';

class Story extends Component {
    constructor() {
        super ()
        this.state = {
            entries: [],
            submission: '',
            activeStory: 'testStory'
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref(`inProgress/${this.state.activeStory}`);
        // console.log(dbRef);

        dbRef.on('value', response => {
            const updatedStory = [];
            const data = response.val();
            // console.log(data);

            for (let entry in data) {
                updatedStory.push({
                    key:entry,
                    submission:data[entry].body,
                    author:data[entry].author,
                    time:data[entry].timestamp
                })
                // console.log(updatedStory);
            }
            this.setState({
                entries: updatedStory,
            })
        })
    }




    render() {
        return (
            <ul>
                    {this.state.entries.map((entry) => {
                        return (
                            <li key={entry.key}>
                                <p className="body">{entry.submission}</p>
                                <p className="attribution">{entry.author}, {entry.time}</p>
                            </li>
                        )
                    })}
            </ul>
        )
    }
}

export default Story;