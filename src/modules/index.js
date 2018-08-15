import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import chart from './chart';

export default combineReducers({
  chart,
  pender: penderReducer,
});
