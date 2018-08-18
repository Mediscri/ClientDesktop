// @flow
import React, { Component } from 'react';
import moment from 'moment';
import * as styled from './Styled';
// component
import History from './History';
import ModalCreate from './ModalCreate';

// TODO: [REMOVE]Test data
const list = [
  {
    date: moment(),
    history: [
      {
        name: '원지운',
        accuracy: 89.6,
        cc: '섬근육통',
      },
      {
        name: '김동민',
        accuracy: 69.3,
        cc: '퇴행성 관절염',
      },
      {
        name: '레자바지',
        accuracy: 74.5,
        cc: '섬근육통',
      },
    ],
  },
  {
    date: moment().subtract(1, 'days'),
    history: [
      {
        name: '손흥민',
        accuracy: 84.7,
        cc: '섬근육통',
      },
      {
        name: '장현수',
        accuracy: 72.5,
        cc: '퇴행성 관절염',
      },
    ],
  },
  {
    date: moment().subtract(2, 'days'),
    history: [
      {
        name: '정준일',
        accuracy: 68.5,
        cc: '섬근육통',
      },
      {
        name: '로이킴',
        accuracy: 84.3,
        cc: '퇴행성 관절염',
      },
      {
        name: '윤하',
        accuracy: 85.9,
        cc: '섬근육통',
      },
    ],
  },
  {
    date: moment().subtract(3, 'days'),
    history: [
      {
        name: '손흥민',
        accuracy: 84.7,
        cc: '섬근육통',
      },
      {
        name: '장현수',
        accuracy: 72.5,
        cc: '퇴행성 관절염',
      },
    ],
  },
];

type Props = {};

type State = {
  create_chart: boolean,
};

export default class Sidebar extends Component<Props, State> {
  state = { create_chart: false };

  handleClickCreate = () => this.setState({ create_chart: true });
  handleDismiss = () => this.setState({ create_chart: false });

  render() {
    return (
      <styled.Container>
        <styled.CreateChart onClick={this.handleClickCreate}>
          신규 진료
        </styled.CreateChart>
        <styled.HistoryContainer>
          <styled.Hr />
          {list.map(data => (
            <History data={data} key={data.date} />
          ))}
        </styled.HistoryContainer>
        {this.state.create_chart && (
          <ModalCreate handleDismiss={this.handleDismiss} />
        )}
      </styled.Container>
    );
  }
}
