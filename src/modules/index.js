import { combineReducers } from 'redux';

import auth from './auth';
import chart from './chart';
import chartList from './chartList';
import socket from './socket';

export default combineReducers({
  auth,
  chart,
  chartList,
  socket,
});
