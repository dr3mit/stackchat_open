import { applyMiddleware, createStore } from "redux";
import loggerMiddleware from "redux-logger";

const intialState = {
  messages: [],
  newMessage: ""
};

const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const NEW_MESSAGE = "NEW_MESSAGE";
const GOT_NEW_MESSAGE_FROM_SERVER = "GOT_NEW_MESSAGE_FROM_SERVER";

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
        messages: [...state.messages, action.message],
        newMessage: ""
      };
    default:
      return state;
  }
};

//must be below reducer definition
const store = createStore(reducer, applyMiddleware(loggerMiddleware));

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

export default store;
