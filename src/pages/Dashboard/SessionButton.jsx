// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styled from './Styled';
// action
import { connectSocket, closeSocket } from '../../modules/socket';

type Props = {
  readyState: 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED' | 'NULL',
  ConnectSocket: Function,
  CloseSocket: Function,
};

const message = {
  START: '진료시작',
  PROGRESS: '진료중..',
  QUIT: '종료하기',
};

type State = {
  btnMessage:
    | typeof message.START
    | typeof message.PROGRESS
    | typeof message.QUIT,
};

class SessionButton extends Component<Props, State> {
  state = {
    btnMessage: message.START,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.readyState === 'OPEN') {
      return prevState.btnMessage === message.START
        ? { btnMessage: message.PROGRESS }
        : null;
    } else {
      return { btnMessage: message.START };
    }
  }

  handleButtonClick = () => {
    const { readyState, ConnectSocket, CloseSocket } = this.props;
    switch (readyState) {
      case 'OPEN':
        CloseSocket();
        break;
      default:
        ConnectSocket('/transcriptions/client/1/');
        break;
    }
  };

  render() {
    const { readyState } = this.props;
    return (
      <styled.ButtonWrapper>
        {readyState === 'OPEN' ? (
          <styled.ButtonProgress
            onMouseEnter={() => this.setState({ btnMessage: message.QUIT })}
            onMouseLeave={() => this.setState({ btnMessage: message.PROGRESS })}
            onClick={this.handleButtonClick}>
            {this.state.btnMessage}
          </styled.ButtonProgress>
        ) : (
          <styled.ButtonReady onClick={this.handleButtonClick}>
            {this.state.btnMessage}
          </styled.ButtonReady>
        )}
      </styled.ButtonWrapper>
    );
  }
}

export default connect(
  state => ({
    readyState: state.socket.readyState,
  }),
  dispatch => ({
    ConnectSocket: (url: string) => connectSocket(url)(dispatch),
    CloseSocket: () => closeSocket(dispatch),
  })
)(SessionButton);
