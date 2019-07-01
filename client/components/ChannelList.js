import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!

export const ChannelList = props => {
  return (
    <ul>
      {props.channels.map(channel => {
        return (
          <li key={channel.id}>
            <NavLink to={`/channels/${channel.id}`} activeClassName="active">
              <span>{channel.name}</span>
              <span className="badge">
                {
                  props.messages.filter(
                    message => message.channelId === channel.id
                  ).length
                }
              </span>
            </NavLink>
          </li>
        );
      })}
      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    channels: state.channels,
    messages: state.messages
  };
};

const ChannelListContainer = connect(mapStateToProps)(ChannelList);

export default ChannelListContainer;
/** Write your `connect` component below! **/
