import React, { Component } from "react";
import store, { newMessage, postMessage } from "../store";

export default class NewMessageEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleValueChange(event) {
    event.preventDefault();
    store.dispatch(newMessage(event.target.value));
  }

  handleSubmit(event) {
    event.preventDefault();
    const content = this.state.newMessage;
    const channelId = this.props.channelId;
    const name = this.state.newMessage.name;
    const data = { content, channelId, name };
    store.dispatch(postMessage(data));
  }

  render() {
    return (
      <form id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.handleValueChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="submit"
              onClick={this.handleSubmit}
            >
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}
