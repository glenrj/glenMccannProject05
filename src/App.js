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
      activeStory: 'activeStory',
      storyName: '',
    }
  }
  
  // clearStory = () => {
  //   const dbRef = firebase.database().ref("inProgress/activeStory");
  //   console.log(dbRef);
  //   // dbRef.;
    
  
  //   dbRef.on('value', response => {
  //     dbRef.push({
  //       "newEntry": {
  //         "author": 'Neverending Story',
  //         "body": 'Start a new story below!',
  //         "time": this.state.timestamp
  //       }
  //     })
  //   })
  // }

  newStory = (e, ) => {
    e.preventDefault();

    const dbRef = firebase.database().ref(`completed`);
    const storyName = this.state.activeStory;
    console.log(storyName, this.state.entries);
    dbRef.once('value', response => {
      console.log(storyName);
      dbRef.push({
        [storyName]: this.state.entries
      })
    })
    // this.clearStory();
  }
  
  



  //     

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
        entries: updatedStory,
      })
    })
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Description />
        <Story entries={this.state.entries} activeStory={this.state.activeStory} />
        <Form entries={this.state.entries} activeStory={this.state.activeStory} newStory={this.newStory} />
      </div>
    );
  }
}

export default App;
