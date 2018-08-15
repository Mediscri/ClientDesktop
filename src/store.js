import { createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import penderMiddleware from 'redux-pender';

import reducer from './modules';

const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(logger, ReduxThunk, penderMiddleware())
);

export default store;
