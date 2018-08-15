// @flow
import React, { Component, Fragment } from 'react';
import * as styled from './Styled';
import Flex from '../../components/Flex';
// // network
// import { Socket } from '../../networks';
// type
import type Moment from 'moment';

const titleList = {
  name: '환자명',
  sex: '성별',
  age: '나이',
  created_at: '진료일자',
};

type Props = {
  data: {
    name: string,
    sex: 'M' | 'F',
    age: string,
    created_at: Moment,
    categories: $ReadOnlyArray<{
      title: string,
      log: $ReadOnlyArray<{
        accuracy: number,
        text: string,
      }>,
    }>,
  },
};

type State = {
  session: 'ready' | 'progress' | 'stop',
  btnMessage: '진료시작' | '진료중..' | '종료하기',
};

export default class InfoBar extends Component<Props, State> {
  state = {
    session: 'ready',
    btnMessage: '진료시작',
  };

  handleButtonClick = () => {
    switch (this.state.session) {
      case 'ready':
      case 'stop':
        // **** TODO: TEST AFTER CONFIRM CONNECT
        // Socket.connect('/sentence');
        this.setState({ session: 'progress', btnMessage: '진료중..' });
        break;
      case 'progress':
        // **** TODO: TEST AFTER CONFIRM CONNECT
        // Socket.close();
        this.setState({ session: 'stop', btnMessage: '진료시작' });
        break;
      default:
    }
  };

  render() {
    const { data } = this.props;
    return (
      <styled.InfoContainer>
        {Object.keys(titleList).map(key => (
          <Fragment key={key}>
            <styled.InfoWrapper>
              <styled.InfoTitle>{titleList[key]}</styled.InfoTitle>
              <Flex dir="column" option="flex: 1; justify-content: flex-end;">
                <styled.InfoContent>
                  {key === 'created_at'
                    ? data[key].format('YYYY.MM.DD hh:mm')
                    : data[key]}
                </styled.InfoContent>
              </Flex>
            </styled.InfoWrapper>
            {key !== 'created_at' && <styled.Vr />}
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
