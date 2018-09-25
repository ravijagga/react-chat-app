import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react'

class SendMsgForm extends Component {
  constructor(props) {
    super();
    this.state = {
      myMessage: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ myMessage: e.target.value });
    this.props.onChange();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.myMessage);

    // Clear text input field
    this.setState({ myMessage: "" });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          
              <Input className="msg-input" placeholder="Enter your message and hit enter..." value={this.state.myMessage} onChange={this.onChange}/>
          
        </Form>
      </div>
    );
  }
}

export default SendMsgForm;