import { createStore, applyMiddleware, compose } from 'redux';

import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import reducer from './modules';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middleware = [ReduxThunk];
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, createLogger()];
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
