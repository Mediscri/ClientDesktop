// @flow
import React, { Component, Fragment } from 'react';
import * as styled from './Styled';
import Flex from '../../components/Flex';
// network
import { Socket } from '../../networks';
// type
import type { Chart } from '../../modules/chart';

type Props = { data: Chart };

type State = {
  session: 'ready' | 'progress' | 'stop',
  btnMessage: '진료시작' | '진료중..' | '종료하기',
};

export default class InfoBar extends Component<Props, State> {
  state = {
    session: 'ready',
    btnMessage: '진료시작',
  };

  title = {
    name: '환자명',
    sex: '성별',
    age: '나이',
    created: '진료일자',
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
    const { data } = this.props;
    return (
      <styled.InfoContainer>
        {Object.keys(this.title).map(key => (
          <Fragment key={key}>
            <styled.InfoWrapper>
              <styled.InfoTitle>{this.title[key]}</styled.InfoTitle>
              <Flex dir="column" option="flex: 1; justify-content: flex-end;">
                <styled.InfoContent>
                  {key === 'created'
                    ? data[key].format('YYYY.MM.DD hh:mm')
                    : data.patient[key]}
                </styled.InfoContent>
              </Flex>
            </styled.InfoWrapper>
            {key !== 'created' && <styled.Vr />}
          </Fragment>
        ))}
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
      </styled.InfoContainer>
    );
  }
}
