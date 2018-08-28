// @flow
import { Component } from 'react';
import { connect } from 'react-redux';
import { setAuth } from '../modules/auth';
// type
import type { Body } from '../modules/auth';

type Props = {
  auth: { token: string },
  SetAuth: Function,
};

class CheckAuth extends Component<Props> {
  componentDidMount() {
    const { auth, SetAuth } = this.props;
    if (!auth.token) {
      SetAuth({ username: 'admin', password: 'admin' });
    }
  }

  render() {
    return null;
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    SetAuth: (body: Body) => setAuth(body)(dispatch),
  })
)(CheckAuth);
