import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import chart from './chart';
import socket from './socket';

export default combineReducers({
  chart,
  socket,
  pender: penderReducer,
});
