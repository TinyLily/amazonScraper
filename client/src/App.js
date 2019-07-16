import React, { Component } from 'react';
import AsinSearch from './AsinSearch';
import './App.css';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <AsinSearch />
      </div>
    );
  }
}

export default App;