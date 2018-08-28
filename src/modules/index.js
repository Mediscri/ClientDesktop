import { combineReducers } from 'redux';

import chart from './chart';
import socket from './socket';

export default combineReducers({
  chart,
  socket,
});
