import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MessagesList from "./MessagesList";
import NewChannelContainer from "./NewChannelEntry";
import { store, fetchMessages, fetchChannels } from "../store";

export default class Main extends Component {
  componentDidMount() {
    const messagesThunk = fetchMessages();
    const channelsThunk = fetchChannels();
    store.dispatch(messagesThunk);
    store.dispatch(channelsThunk);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Navbar />
        <main>
          <Switch>
            <Route path="/new-channel" component={NewChannelContainer} />
            <Route path="/channels/:channelId" component={MessagesList} />
            <Redirect to="/channels/1" />
          </Switch>
        </main>
      </div>
    );
  }
}
