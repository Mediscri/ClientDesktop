// @flow
import produce from 'immer';
// network
import { socket as Socket } from '../networks';
// type
import type { Dispatch } from 'redux';

export type State = {|
  readyState: 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED' | 'NULL',
|};

/* eslint-disable no-useless-computed-key */
const EnumState = {
  [0]: 'CONNECTING',
  [1]: 'OPEN',
  [2]: 'CLOSING',
  [3]: 'CLOSED',
};
/* eslint-enable no-useless-computed-key */

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
const initState: State = { readyState: 'NULL' };

// *** REDUCER
type Action = {|
  type: typeof UPDATE_STATE,
|};

export default function socket(state: State = initState, action: Action) {
  switch (action.type) {
    case UPDATE_STATE:
      return produce(state, draft => {
        const { socket } = Socket;
        draft.readyState = EnumState[socket.readyState];
      });
    default:
      return state;
  }
}
