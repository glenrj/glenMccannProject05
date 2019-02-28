import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import Header from './Header.js';
import Description from './Description.js';
import Story from './Story.js';
import Form from './Form.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      submission: '',
      activeStory: 'testStory'
  }
}

    componentDidMount() {
      const dbRef = firebase.database().ref(`inProgress/${this.state.activeStory}`);

      dbRef.on('value', response => {
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
        this.setState({
          entries: updatedStory,
        })
      })
    }

  render() {
    return (
      <div className="App">
        <Header />
        <Description />
        <Story entries={this.state.entries} submission={this.state.submission} activeStory={this.state.activeStory}/>
        <Form entries={this.state.entries} submission={this.state.submission} activeStory={this.state.activeStory}/>
      </div>
    );
  }
}

export default App;
