import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./components/ducks/userReducer";
import postReducer from "./components/ducks/postReducer";
import replyReducer from "./components/ducks/replyReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    userReducer,
    postReducer,
    replyReducer
});

export default createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(promiseMiddleware))
);