import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import loggingMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import socket from "./socket";

// INITIAL STATE

const initialState = {
  messages: [],
  name: "Reggie",
  newMessageEntry: "",
  channels: [],
  newChannel: ""
};

// ACTION TYPES

const UPDATE_NAME = "UPDATE_NAME";
const GET_MESSAGE = "GET_MESSAGE";
const GET_MESSAGES = "GET_MESSAGES";
const WRITE_MESSAGE = "WRITE_MESSAGE";
const GET_CHANNELS = "GET_CHANNELS";
const NEW_CHANNEL = "NEW_CHANNEL";
const POST_NEW_CHANNEL = "POST_NEW_CHANNEL";

// ACTION CREATORS
export const postNewChannel = channel => {
  return {
    type: POST_NEW_CHANNEL,
    channel
  };
};
export const newChannel = channel => {
  return {
    type: NEW_CHANNEL,
    channel
  };
};

export const getChannels = channels => {
  return {
    type: GET_CHANNELS,
    channels
  };
};

export function updateName(name) {
  const action = { type: UPDATE_NAME, name };
  return action;
}

export function getMessage(message) {
  const action = { type: GET_MESSAGE, message };
  return action;
}

export function getMessages(messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

export function writeMessage(content) {
  const action = { type: WRITE_MESSAGE, content };
  return action;
}

// THUNK CREATORS

export function fetchMessages() {
  return function thunk(dispatch) {
    return axios
      .get("/api/messages")
      .then(res => res.data)
      .then(messages => {
        const action = getMessages(messages);
        dispatch(action);
      })
      .catch(e => console.error(e));
  };
}

export function postMessage(message) {
  return function thunk(dispatch) {
    return axios
      .post("/api/messages", message)
      .then(res => res.data)
      .then(newMessage => {
        const action = getMessage(newMessage);
        dispatch(action);
        socket.emit("new-message", newMessage);
      })
      .catch(e => console.error("Error in posting message", e));
  };
}

export const fetchChannels = () => dispatch =>
  axios
    .get("/api/channels")
    .then(res => res.data)
    .then(channels => dispatch(getChannels(channels)))
    .catch(e => console.error("Error fetching channels", e));

export const pushNewChannel = (channel, history) => dispatch =>
  axios
    .post("/api/channels", channel)
    .then(res => res.data)
    .then(channel => {
      dispatch(postNewChannel(channel));
      socket.emit("new-channel", channel);
      history.push(`/channels/${channel.id}`);
    })
    .catch(e => console.error("Error posting new channel to database", e));

// REDUCER

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.name
      };

    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };

    case GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.content
      };

    case GET_CHANNELS:
      return {
        ...state,
        channels: action.channels
      };

    case NEW_CHANNEL:
      return {
        ...state,
        newChannel: action.channelName
      };

    case POST_NEW_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel],
        newChannel: ""
      };
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware))
);
