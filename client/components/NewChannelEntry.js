import React, { Component } from "react";
import { connect } from "react-redux";
import { newChannel, postNewChannel, pushNewChannel } from "../store";

function NewChannelEntry(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input
          value={props.newChannel}
          className="form-control"
          type="text"
          name="channelName"
          placeholder="Enter channel name"
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">
          Create Channel
        </button>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: event => {
      dispatch(newChannel(event.target.value));
    },
    handleSubmit: event => {
      event.preventDefault();
      dispatch(
        pushNewChannel(
          { name: event.target.channelName.value },
          ownProps.history
        )
      );
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    newChannel: state.newChannel
  };
};
/** Write your `connect` component below! **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannelEntry);
