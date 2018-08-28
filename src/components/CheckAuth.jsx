import { Component } from 'react';

import { checkToken, setToken } from '../networks/authroization';

class CheckAuth extends Component {
  state = { token: false };

  componentDidMount() {
    checkToken()
      .then(() => this.setState({ token: true }))
      .catch(() => {
        console.log('has no token here');
        setToken({ username: 'admin', password: 'admin' }).then(() =>
          this.setState({ token: true })
        );
      });
  }

  render() {
    return this.state.token && null;
  }
}

export default CheckAuth;
