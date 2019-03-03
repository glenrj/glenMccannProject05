import React, { Component } from 'react';
import firebase from './firebase.js';
import './../styles/form.css';

class Form extends Component {
    constructor() {
        super()
        this.state = {
            authorInput: '',
            bodyInput: '',
            timestamp: '',
            storyTitle: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();

        //GETTING DATE, MAKE THIS  IT'S OWN FUNCTION LATER //
        const now = new Date();
        let hour = now.getHours();
        let minutes = now.getMinutes();
        if (minutes <= 9) {
            let newMinutes = ("0" + minutes).slice(-2);
            minutes = newMinutes;
        }
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let monthIndex = now.getMonth();
        let month = months[monthIndex];
        let year = now.getFullYear();
        let day = now.getDate();

        const date = `${hour}:${minutes}, ${month} ${day}, ${year}`
        ///END OF DATE STUFF //

        this.setState({
            timestamp: date
        }, function () {
            const dbRef = firebase.database().ref(`inProgress/${this.props.activeStory}`);
            dbRef.push({
                "author": this.state.authorInput,
                "body": this.state.bodyInput,
                "time": this.state.timestamp
            });

            this.setState({
                authorInput: '',
                bodyInput: '',
                storyTitle: '',

            })
        })
    }

    render() {
        return (
            <div className="formContainer">
                <div className="form">
                <form action="submit" onSubmit={this.handleSubmit}>
                    <p>Your name and submission will be public.</p>
                    <input
                        className="storyField"
                        type="text"
                        name="bodyInput"
                        placeholder="What happens next?"
                        onChange={this.handleChange}
                        value={this.state.bodyInput}
                        required />
                    <input
                        className="smallField"
                        type="text"
                        name="authorInput"
                        placeholder="Name"
                        onChange={this.handleChange}
                        value={this.state.authorInput}
                        required />
                    <button type="submit" >Add to the story</button>
                </form>
                <form action="submit" onSubmit={(e) => this.props.newStory(e, this.state.storyTitle)}>
                <p>If there is nothing left to add, you can instead choose to save this story under a name and add it to the collection. A new story will begin.</p>
                    <input
                        className="smallField"
                        type="text"
                        name="storyTitle"
                        placeholder="Story Title"
                        value={this.state.storyTitle}
                        onChange={this.handleChange}
                        required />
                    <button type="submit">Finish the story</button>
                </form>
                </div>

            </div>
        )
    }
}

export default Form;