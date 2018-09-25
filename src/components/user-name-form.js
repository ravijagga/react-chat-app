import React, { Component } from 'react';
import { Container, Form, Input, Button, Grid } from 'semantic-ui-react';

class UserNameForm extends Component {
  constructor(props) {
    super();
    this.state = {
      username: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Group inline>
            <Form.Field>
              <Input placeholder="Enter your name..." onChange={this.onChange}/>
            </Form.Field>
            <Form.Field>
              <Button type="submit">Start Chat</Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default UserNameForm;