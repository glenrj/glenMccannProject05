import React, { Component } from 'react';
import firebase from './firebase.js';

class Completed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            completedStories: [],
            titleArray: []
        }
    }

    componentDidMount() {
        //get story names from titles array
        const dbRef = firebase.database().ref("titles");
        dbRef.on('value', response => {
            let data = response.val()
            console.log(data)

            this.setState({
                titleArray: data
            })
        })
        
        // get completed stories from firebase using titles
       const completedRef = firebase.database().ref("completed");
       completedRef.on('value', response => {
           let stories = response.val();
           console.log(stories);
       })

       this.state.titleArray.forEach(function(title) {
           console.log(title);
       })

    }
       

    render() {
        return (
            <ul>
                <h2>View Completed Stories Below</h2>
                <p>{this.props.titles}</p>
            </ul>
        )
    }
}

export default Completed;


// completedStories: [
//     [{"author: Glen", "body: what a neat story", "timestamp: now"}, {"author": "Morgan", "body": "Cool story but not enough arrays.", "timestamp": "the future?"}], 
//     [{"author": "Cecil", "body": "This is the first entry in a new story", "timestamp":"now"}, {"author": "Cecil", "body": "This is a second entry just to let you know I'm tearing up the curtains." "timestamp": "All day, buddy."}]]
