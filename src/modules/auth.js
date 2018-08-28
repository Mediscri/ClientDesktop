// @flow
import { checkToken, setToken } from '../networks/Auth';
// type
import type { Dispatch } from 'redux';

type Auth = { token: string | null };

export type Body = { username: string, password: string };

// *** ACTION TYPE
const SET_AUTHORIZATION = 'auth/SET_AUTHORIZATION';

// *** ACTION FUNCTION
export const setAuth = (body: Body) => (dispatch: Dispatch) =>
  checkToken()
    .then(token => dispatch({ type: SET_AUTHORIZATION, payload: token }))
    .catch(e =>
      setToken(body).then(token =>
        dispatch({ type: SET_AUTHORIZATION, payload: token })
      )
    );

// *** INITIAL STATE
const initState = { token: null };

// *** REDUCER
type Action = {|
  +type: typeof SET_AUTHORIZATION,
  +payload: string,
|};

export default function auth(state: Auth = initState, action: Action) {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
