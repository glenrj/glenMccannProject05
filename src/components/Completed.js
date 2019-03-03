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

    componentDidMount() {
        //get story names from titles array
        this.setState({
            titleArray: this.props.titles
        }, function() {
            this.state.titleArray.forEach(function(title) {
                let dbRef = firebase.database().ref(`titles/${title}`)
                console.log(title);
            })

        })

    }

    render() {
        return (
            <ul>
                <h2>View Completed Stories Below</h2>
                
            </ul>
        )
    }
}

export default Completed;
