import React, { Component } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import { Container } from 'semantic-ui-react'

class OnlineUsersList extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Container>
        <AutoSizer className="autosizer-fix">
          {({width})=>(
            <List
              width={width}
              height={300}
              rowCount={this.props.onlineUsers ? this.props.onlineUsers.length : 0}
              rowHeight={20}
              rowRenderer = {({key, index, isScrolling, isVisible, style})=>{
                const onlineUsersOutput = this.props.onlineUsers.map((user, index) => {
                  return `${user.name} (${user.presence.state})`;
                });

                return (
                  <div key={key} style={style}> 
                  { onlineUsersOutput[index] }
                </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </Container>
    );
  }
}

export default OnlineUsersList;