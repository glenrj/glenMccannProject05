import React, { Component } from 'react';
import firebase from './firebase.js';


class Form extends Component {
    constructor() {
        super()
        this.state = {
            authorInput: '',
            bodyInput: '',
            timestamp: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        
        const now = new Date();
        let hour = now.getHours();
        let minutes = now.getMinutes();
        if(minutes <= 9) {
            let newMinutes = ("0" + minutes).slice(-2);
            minutes = newMinutes;
        }
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let monthIndex = now.getMonth();
        let month = months[monthIndex];
        let year = now.getFullYear();
        let day = now.getDate();
        
        const date = `${hour}:${minutes}, ${month} ${day}, ${year}`
        
        this.setState({
            timestamp: date
        }, function(){
            const dbRef = firebase.database().ref(`inProgress/${this.props.activeStory}`);
            dbRef.push({
                "author": this.state.authorInput,
                "body": this.state.bodyInput,
                "time": this.state.timestamp
            });
        })

    }


    render() {
        return (
            <form action="submit" onSubmit={this.handleSubmit}>
                <p>Your name and submission will be public.</p>
                <input type="text" name="authorInput" id="" placeholder="Name" onChange={this.handleChange} required/>
                <input type="text" name="bodyInput" id="" placeholder="What happens next?" onChange={this.handleChange} required/>
                <input type="checkbox" name="This is the end of the story" id=""/>
                <button type="submit">Add to the story</button>
            </form>
        )
    }
}

export default Form;