import React, { Component } from "react";
import Message from "./Message";
import NewMessageEntry from "./NewMessageEntry";
import store, { fetchMessages } from "../store";
export default class MessagesList extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    store.dispatch(fetchMessages());
    this.unsub = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(
      message => message.channelId === channelId
    );

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry
          channelId={Number(this.props.match.params.channelId)}
        />
      </div>
    );
  }
}
