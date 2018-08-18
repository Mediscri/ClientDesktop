// @flow
import produce from 'immer';
// network
import { Socket } from '../networks';
// type
import type { Dispatch } from 'redux';

type SocketType = {|
  readyState: 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED' | 'NULL',
|};

const EnumState = {
  [0]: 'CONNECTING',
  [1]: 'OPEN',
  [2]: 'CLOSING',
  [3]: 'CLOSED',
};

// *** ACTION TYPE
const UPDATE_STATE = 'socket/UPDATE_STATE';

// *** ACTION FUNCTION
export const updateState = (dispatch: Dispatch) =>
  dispatch({ type: UPDATE_STATE });

export const connectSocket = (url: string) => (dispatch: Dispatch) =>
  Socket.connect(
    url,
    dispatch
  );

export const closeSocket = (dispatch: Dispatch) => Socket.close(dispatch);

// *** INITIAL STATE
const initState: SocketType = { readyState: 'NULL' };

// *** REDUCER
type Action = {|
  type: typeof UPDATE_STATE,
|};

export default function socket(state: SocketType = initState, action: Action) {
  switch (action.type) {
    case UPDATE_STATE:
      return produce(state, draft => {
        draft.readyState = EnumState[Socket.socket.readyState];
      });
    default:
      return state;
  }
}
