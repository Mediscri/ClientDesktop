import { createStore, applyMiddleware, compose } from 'redux';

import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import penderMiddleware from 'redux-pender';

import reducer from './modules';

const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, ReduxThunk, penderMiddleware()))
);
export default store;
