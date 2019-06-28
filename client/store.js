import { applyMiddleware, createStore } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import Axios from "axios";
import socket from "../client/socket";

const intialState = {
  messages: [],
  newMessage: "",
  name: ""
};

const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const NEW_MESSAGE = "NEW_MESSAGE";
const GOT_NEW_MESSAGE_FROM_SERVER = "GOT_NEW_MESSAGE_FROM_SERVER";
const NAME_CHANGE = "NAME_CHANGE";

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {
        ...state,
        messages: action.messages
      };
    case NEW_MESSAGE:
      return {
        ...state,
        newMessage: action.message
      };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    case NAME_CHANGE:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};

//must be below reducer definition
const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);

export const gotMessagesFromServer = messages => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
  };
};

export const newMessage = message => {
  return {
    type: NEW_MESSAGE,
    message: message
  };
};

export const gotNewMessageFromServer = message => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message: message
  };
};

export const nameChange = name => {
  return {
    type: NAME_CHANGE,
    name: name
  };
};

export const fetchMessages = () => {
  return (dispatch, getState) => {
    Axios.get("/api/messages")
      .then(res => res.data)
      .then(messages => dispatch(gotMessagesFromServer(messages)))
      .catch(e => console.error(e));
  };
};

export const postMessage = data => {
  return dispatch => {
    Axios.post("/api/messages", {
      content: data.content,
      channelId: data.channelId,
      name: store.getState().name
    })
      .then(res => res.data)
      .then(message => {
        dispatch(gotNewMessageFromServer(message));
        socket.emit("new-message", message);
      })
      .catch(error => console.log(error));
  };
};

export default store;
