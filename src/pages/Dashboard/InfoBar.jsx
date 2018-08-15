// @flow
import React, { Component, Fragment } from 'react';
import * as styled from './Styled';
import Flex from '../../components/Flex';
// // network
// import { Socket } from '../../networks';
// type
import type Moment from 'moment';

type Props = {|
  data: {
    +id: number,
    +created_at: Moment,
    +patient: {
      +id: number,
      +name: string,
      +age: number,
      +sex: 'm' | 'f',
    },
    +doctor: {
      +id: number,
      +name: string,
    },
    categories: {
      cc: Array<{| text: string, accuracy?: number |}>, // chief complaint
      pi: Array<{| text: string, accuracy?: number |}>, // present illness
      pmh: Array<{| text: string, accuracy?: number |}>, // past medical history
      fh: Array<{| text: string, accuracy?: number |}>, // family history
      sh: Array<{| text: string, accuracy?: number |}>, // social history
      ros: Array<{| text: string, accuracy?: number |}>, // review of system
    },
  },
|};

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
    created_at: '진료일자',
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
        {Object.keys(this.title).map(key => (
          <Fragment key={key}>
            <styled.InfoWrapper>
              <styled.InfoTitle>{this.title[key]}</styled.InfoTitle>
              <Flex dir="column" option="flex: 1; justify-content: flex-end;">
                <styled.InfoContent>
                  {key === 'created_at'
                    ? data[key].format('YYYY.MM.DD hh:mm')
                    : data.patient[key]}
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
