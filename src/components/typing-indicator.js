import React, { Component } from 'react';

class TypingIndicator extends Component {
  constructor(props) {
    super();
  }

  render() {
    if (this.props.usersWhoAreTyping.length === 0) {
      return <div />;
    } else if (this.props.usersWhoAreTyping.length === 1) {
      return <p>{this.props.usersWhoAreTyping[0]} is typing...</p>;
    } else if (this.props.usersWhoAreTyping.length > 1) {
      return <p>{this.props.usersWhoAreTyping.join(' are ')} are typing...</p>;
    }
  }
}

export default TypingIndicator;