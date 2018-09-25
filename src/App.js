import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserNameForm from './components/user-name-form';
import ChatScreen from './components/chat-screen';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: '',
      currentScreen: 'UserNameFormScreen'
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    }).then(response => {
      this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen'
      })
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    if (this.state.currentScreen === 'UserNameFormScreen') {
      return <UserNameForm onSubmit={this.onUsernameSubmitted} />;
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen username={this.state.currentUsername} />;
    }
  }
}

export default App;