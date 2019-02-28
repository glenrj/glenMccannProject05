import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import Description from './Description.js';
import Story from './Story.js';
import Form from './Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Description />
        <Story />
        <Form />
      </div>
    );
  }
}

export default App;
