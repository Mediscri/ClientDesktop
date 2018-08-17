// @flow
import React, { Component } from 'react';
import * as styled from './Styled';
// network
import { Socket } from '../../networks';

type Props = {};

type State = {
  session: 'ready' | 'progress' | 'stop',
  btnMessage: '진료시작' | '진료중..' | '종료하기',
};

class SessionButton extends Component<Props, State> {
  state = {
    session: 'ready',
    btnMessage: '진료시작',
  };

  handleButtonClick = () => {
    switch (this.state.session) {
      case 'ready':
      case 'stop':
        Socket.connect('/transcriptions/client/1/');
        this.setState({ session: 'progress', btnMessage: '진료중..' });

        break;
      case 'progress':
        Socket.close();
        this.setState({ session: 'stop', btnMessage: '진료시작' });
        break;
      default:
    }
  };

  render() {
    return (
      <styled.ButtonWrapper>
        {this.state.session === 'progress' ? (
          <styled.ButtonProgress
            onMouseEnter={() => this.setState({ btnMessage: '종료하기' })}
            onMouseLeave={() => this.setState({ btnMessage: '진료중..' })}
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

export default SessionButton;
