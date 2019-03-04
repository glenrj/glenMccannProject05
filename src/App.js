import React, { Component } from 'react';
import firebase from './components/firebase';
import './App.css';
import Header from './components/Header.js';
import Description from './components/Description.js';
import Story from './components/Story.js';
import Form from './components/Form.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      activeStory: 'activeStory',
      storyName: '',
      titleArray: []
    }
  }

  //function to clear stories when a new one is started
  clearStory = () => {
    // remove active entries
    const dbRef = firebase.database().ref("inProgress/activeStory");
    dbRef.remove();

    //add a new entry as a placeholder to show entries
    dbRef.push({
      "author": "Sylvia Plath",
      "body": "“And by the way, everything in life is writable about if you have the outgoing guts to do it, and the imagination to improvise. The worst enemy to creativity is self-doubt.”",
      "time": 'The Unabridged Journals of Sylvia Plath'
    })
  }

  //start a new story
  newStory = () => {

    const storyName = this.state.storyName;

    const dbRef = firebase.database().ref("completed");
    dbRef.once('value', response => {
      console.log(storyName);
      dbRef.push({
        [storyName]: this.state.entries
      })
    })

    this.clearStory();
  }

  //get the title from user input, called on submission of form component
  getTitle = (e, title) => {
    e.preventDefault();

    this.setState({
      storyName: title
    }, function () {
      //call new story function to save name and begin a new story
      this.newStory();
    })
  }

  componentDidMount() {
    //get active story to print to page
    const dbRef = firebase.database().ref(`inProgress/activeStory`);

    dbRef.on('value', response => {
      // hold update story entries in array
      const updatedStory = [];
      const data = response.val();

      for (let entry in data) {
        updatedStory.push({
          key: entry,
          submission: data[entry].body,
          author: data[entry].author,
          time: data[entry].time
        })
      }
      //set state with active stories
      this.setState({
        entries: updatedStory
      })
    })
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Description />
        <Story entries={this.state.entries} activeStory={this.state.activeStory} />
        <Form entries={this.state.entries} activeStory={this.state.activeStory} newStory={this.getTitle} />
      </div>
    );
  }
}

export default App;
