import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './message-list';
import SendMsgForm from './send-msg-form';
import TypingIndicator from './typing-indicator';
import OnlineUsersList from './online-users-list';
import { Grid, Container, Header } from 'semantic-ui-react';
import './chat-screen.css';

class ChatScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      messages: [],
      currentRoom: '',
      currentUser: '',
      usersWhoAreTyping: [],
      isOffline: false
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('offline', () => {
      this.setState({ isOffline: true });
    });

    window.addEventListener('online', () => {
      this.setState({ isOffline: false });
    });

    // Instantiate chatManager
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:217dd4a1-d1ea-41ff-b37d-81696cfc7f00',
      userId: this.props.username,
      tokenProvider: new TokenProvider({ url: 'http://localhost:3001/authenticate' })
    });

    // connect to chat manager
    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: 17082591,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(username => username !== user.name)
              });
            },
            onUserCameOnline: () => {
              this.forceUpdate();
              // this.forceUpdateGrid();
            }, // call render function again
            onUserWentOffline: () => {
              this.forceUpdate();
              // this.forceUpdateGrid();
            },
            onUserJoined: () => {
              this.forceUpdate();
              // this.forceUpdateGrid();
            }
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(err => {
        console.log(err);
      });
  }

  sendMessage(myMessage) {
    this.state.currentUser.sendMessage({
      roomId: this.state.currentRoom.id,
      text: myMessage
    });
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container>
        <Header as="h1">Hello {this.props.username}!{this.state.isOffline ? " - Internet is down!" : ""}</Header>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={6} color={'olive'}>
              <OnlineUsersList onlineUsers={this.state.currentRoom.users} />
            </Grid.Column>
            <Grid.Column width={10} color={'green'}>
              <MessageList messages={this.state.messages} currentUser={this.state.currentUser} />
              <TypingIndicator usersWhoAreTyping = { this.state.usersWhoAreTyping } />
              <SendMsgForm onSubmit = { this.sendMessage } onChange = { this.sendTypingEvent } />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ChatScreen;