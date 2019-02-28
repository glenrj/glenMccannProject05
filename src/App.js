import React, { Component } from 'react';
import firebase from './components/firebase';
import './App.css';
import Header from './components/Header.js';
import Description from './components/Description.js';
import Story from './Story.js';
import Form from './components/Form.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      submission: '',
      activeStory: 'testStory',
      // activeStory: ''
  }
}

    componentDidMount() {
      // const story = firebase.database().ref('inProgress');
      // console.log(story);

      // this.setState({
      //   activeStory: story[0]
      // })

      // console.log(firebase.database().ref('inProgress').child().limitToFirst(1));

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
