import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import userWords from './userWords';
import words from './words';
import userLevel from './userLevel';
import userLevelWords from './userWordSuggestion/userLevelWords';
import userOtherWords from './userWordSuggestion/userOtherWords';

const reducer = combineReducers({
  user,
  userLevel,
  userWords,
  words,
  userLevelWords,
  userOtherWords,
});
const middleware = [thunkMiddleware, createLogger({ collapsed: true })];

// SETUP w/ REDUX DevTools

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

// SETUP w/o REDUX DevTools
// const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
export * from './user';
export * from './userWords';
export * from './userLevel';
export * from './userWordSuggestion/userLevelWords';
export * from './userWordSuggestion/userOtherWords';
