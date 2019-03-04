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

    // update state on user input
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // get date and time for each submission
    getDate = () => {
        const now = new Date();

        let hour = now.getHours();
        let minutes = now.getMinutes();
        //make sure minute value is are two digits long
        if (minutes <= 9) {
            let newMinutes = ("0" + minutes).slice(-2);
            minutes = newMinutes;
        }
        //get month index and use array to get month value
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let monthIndex = now.getMonth();
        let month = months[monthIndex];

        let year = now.getFullYear();
        let day = now.getDate();

        return (`${hour}:${minutes}, ${month} ${day}, ${year}`);
    }

    //handle form submit for new entry
    handleSubmit = (e) => {
        e.preventDefault();

        //get date and update state
        let date = this.getDate();

        this.setState({
            timestamp: date
        }, function () {
            //add new entry to story on firebase
            const dbRef = firebase.database().ref(`inProgress/${this.props.activeStory}`);
            dbRef.push({
                "author": this.state.authorInput,
                "body": this.state.bodyInput,
                "time": this.state.timestamp
            });

            //reset form and state
            this.setState({
                authorInput: '',
                bodyInput: '',
                storyTitle: '',

            })
        })
    }

    render() {
        return (
            //form section
            <section className="formSection">
                <div className="formContainer">
                    {/* form */}
                    <div className="form">
                        {/* new submission form */}
                        <form action="submit" onSubmit={this.handleSubmit}>
                            <p>Your name and submission will be public.</p>
                            {/* sotry input */}
                            <label htmlFor="bodyInput" className="visuallyHidden">Story Submission:</label>
                            <textarea
                                className="storyField"
                                name="bodyInput"
                                id="bodyInput"
                                placeholder="What happens next?"
                                onChange={this.handleChange}
                                value={this.state.bodyInput}
                                required
                                maxLength="500"
                            />
                            {/* author input */}
                            <label htmlFor="authorInput" className="visuallyHidden">Your Name:</label>
                            <input
                                className="smallField"
                                type="text"
                                name="authorInput"
                                id="authorInput"
                                placeholder="Name"
                                onChange={this.handleChange}
                                value={this.state.authorInput}
                                required />
                            {/* submit button */}
                            <button type="submit" >Add to the story</button>
                        </form>
                        {/* new story form */}
                        <form action="submit" onSubmit={(e) => this.props.newStory(e, this.state.storyTitle)}>
                            <p>If there is nothing left to add, you can instead choose to give this story a name before wiping the slate clean and beginning a new one.</p>
                            {/* story title input */}
                            <label htmlFor="storyTitle" className="visuallyHidden">Story Name:</label>
                            <input
                                className="smallField"
                                type="text"
                                name="storyTitle"
                                id="storyTitle"
                                placeholder="Story Title"
                                value={this.state.storyTitle}
                                onChange={this.handleChange}
                                required />
                            {/* submit button */}
                            <button type="submit">Finish the story</button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default Form;