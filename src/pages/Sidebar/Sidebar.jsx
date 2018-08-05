// @flow
import React, { Component } from 'react';
import moment from 'moment';
import styled from './Styled';
// component
import History from './History';

const list = [
  {
    date: moment(),
    history: [
      {
        name: '원지운',
        accuracy: 89.6,
        pi: '섬근육통',
      },
      {
        name: '김동민',
        accuracy: 69.3,
        pi: '퇴행성 관절염',
      },
      {
        name: '레자바지',
        accuracy: 74.5,
        pi: '섬근육통',
      },
    ],
  },
  {
    date: moment().subtract(1, 'days'),
    history: [
      {
        name: '손흥민',
        accuracy: 84.7,
        pi: '섬근육통',
      },
      {
        name: '장현수',
        accuracy: 72.5,
        pi: '퇴행성 관절염',
      },
    ],
  },
  {
    date: moment().subtract(2, 'days'),
    history: [
      {
        name: '정준일',
        accuracy: 68.5,
        pi: '섬근육통',
      },
      {
        name: '로이킴',
        accuracy: 84.3,
        pi: '퇴행성 관절염',
      },
      {
        name: '윤하',
        accuracy: 85.9,
        pi: '섬근육통',
      },
    ],
  },
  {
    date: moment().subtract(3, 'days'),
    history: [
      {
        name: '손흥민',
        accuracy: 84.7,
        pi: '섬근육통',
      },
      {
        name: '장현수',
        accuracy: 72.5,
        pi: '퇴행성 관절염',
      },
    ],
  },
];

export default class Sidebar extends Component<{}> {
  render() {
    return (
      <styled.Container>
        <styled.CreateBoard>신규 진료</styled.CreateBoard>
        <styled.HistoryContainer>
          <styled.Hr />
          {list.map(data => <History data={data} key={data.date} />)}
        </styled.HistoryContainer>
      </styled.Container>
    );
  }
}
