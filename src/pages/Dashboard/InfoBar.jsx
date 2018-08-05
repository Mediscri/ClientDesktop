// @flow
import React, { Component, Fragment } from 'react';
import styled from './Styled';
import Flex from '../../components/Flex';
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
};

export default class InfoBar extends Component<Props, State> {
  state = {
    session: 'ready',
  };

  handleButtonClick = () => {
    switch (this.state.session) {
      case 'ready':
      case 'stop':
        this.setState({ session: 'progress' });
        break;
      case 'progress':
        this.setState({ session: 'stop' });
        break;
      default:
        break;
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
            {key !== 'created_at' && <styled.Hr />}
          </Fragment>
        ))}
        <styled.ButtonWrapper>
          {this.state.session === 'progress' ? (
            <styled.ButtonProgress onClick={this.handleButtonClick}>
              진료중...
            </styled.ButtonProgress>
          ) : (
            <styled.ButtonReady onClick={this.handleButtonClick}>
              진료 시작
            </styled.ButtonReady>
          )}
        </styled.ButtonWrapper>
      </styled.InfoContainer>
    );
  }
}
