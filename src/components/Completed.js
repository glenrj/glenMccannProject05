import React, { Component } from 'react';
import firebase from './firebase.js';

class Completed extends Component {
    constructor() {
        super()
        this.state = {
            completedStories: [],
            titleArray: []
        }
    }

    // componentDidMount() {
    //     const dbRef = firebase.database().ref('completed');
    //     this.setState({
    //         titleArray: this.props.titles
    //     }, function () {
            
    //     }
    //     dbRef.on('value', response => {
            

    //         console.log(this.state.titleArray);

    //         const data = response.val();

    //         console.log(data);

    //         // for (let entry in data) {
    //         //     let submission = entry[title];
    //         //     console.log(submission);
    //         //     this.state.completedStories.push(submission)
    //         // }

    //         // console.log(this.state.completedStories);
    //     })
    //     )
    // }
    render() {
        return (
            <ul>
                <h2>View Completed Stories Below</h2>
                {/* {this.state.titleArray.map((story) =>{
                    console.log(story, '1');
                    this.state.completedStories.map((entry, i) => {
                        console.log(story, entry, '2');
                        return (
                            <li key={i}>
                                <p className="body">{entry[story][0].submission}</p>
                                <p>sup</p>
                            </li>
                        )
                    })

                })
                } */}
                    {/* {this.state.completedStories.map((entry, i) => {
                        return (
                            <li key={i}>
                                <p className="body">{entry.submission}</p>
                                <p className="attribution">{entry.author}, {entry.time}</p>
                            </li>
                        )
                    })} */}
            </ul>
        )
    }
}

export default Completed;
