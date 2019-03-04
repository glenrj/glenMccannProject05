import React, { Component } from 'react';
import firebase from './components/firebase';
import './App.css';
import Header from './components/Header.js';
import Description from './components/Description.js';
import Story from './components/Story.js';
import Form from './components/Form.js';
import Completed from './components/Completed.js';

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

  clearStory = () => {
    const dbRef = firebase.database().ref("inProgress/activeStory");
    dbRef.remove();

    dbRef.push({
      "author": "Sylvia Plath",
      "body": "“And by the way, everything in life is writable about if you have the outgoing guts to do it, and the imagination to improvise. The worst enemy to creativity is self-doubt.”",
      "time": 'The Unabridged Journals of Sylvia Plath'
    })
  }

  newStory = () => {
    //add new story title to array of titles
    let completedStories = this.state.titleArray;
    const storyName = this.state.storyName;
    completedStories.push(storyName);
    this.setState({
      titleArray: completedStories
    })

    const titleRef = firebase.database().ref("titles");
    titleRef.update(this.state.titleArray);

    const dbRef = firebase.database().ref("completed");
    dbRef.once('value', response => {
      console.log(storyName);
      dbRef.push({
        [storyName]: this.state.entries
      })
    })

    this.clearStory();
  }

  getTitle = (e, title) => {
    e.preventDefault();

    this.setState({
      storyName: title
    }, function () {
      this.newStory();
    })
  }

  componentDidMount() {
    const dbRef = firebase.database().ref(`inProgress/activeStory`);

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
        entries: updatedStory
      })
    })

    const titleRef = firebase.database().ref("titles");

    titleRef.on('value', response => {
      const data = response.val();
      
      this.setState({
        titleArray: data
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
        {/* <Completed titles={this.state.titleArray} /> */}
      </div>
    );
  }
}

export default App;
