import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';

class MessageList extends Component {
  constructor(props) {
    super();
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) {
    return (
      <div key={key} style={style} className={(this.props.messages[index].senderId === this.props.currentUser.id) ? "my-msg" : "others-msg"}>
        <span>user: {this.props.messages[index].senderId}</span>
        <p> { this.props.messages[index].text } </p>
      </div>
    );
  }

  render() {
    return (
      <AutoSizer className="autosizer-fix">
        {({width})=>(
          <List
            width={width}
            height={280}
            rowCount = { this.props.messages ? this.props.messages.length : 0 }
            rowHeight={50}
            rowRenderer={this.rowRenderer}
            scrollToIndex={this.props.messages.length - 1}
          />
        )}
      </AutoSizer>
    );
  }
}

export default MessageList;