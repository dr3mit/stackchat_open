import React, { Component } from "react";
import store, { nameChange } from "../store";

export default class NameEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleNameChange(event) {
    event.preventDefault();
    store.dispatch(nameChange(event.target.value));
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleNameChange}
        />
      </form>
    );
  }
}
