// @flow
import React, { Component } from 'react';
import moment from 'moment';

import { getChart } from '../../networks';

import * as styled from './Styled';
import InfoBar from './InfoBar';
import Category from './Category';
// component
import Flex from '../../components/Flex';

type Props = {};

type State = {
  data:
    | {
        +id: number,
        +created_at: Date,
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
          cc: Array<{ text: string, accuracy?: number }>, // chief complaint
          pi: Array<{ text: string, accuracy?: number }>, // present illness
          pmh: Array<{ text: string, accuracy?: number }>, // past medical history
          fh: Array<{ text: string, accuracy?: number }>, // family history
          sh: Array<{ text: string, accuracy?: number }>, // social history
          ros: Array<{ text: string, accuracy?: number }>, // review of system
        },
      }
    | { id: null },
};

// TODO: [REMOVE]Test data
const data = {
  name: '원지운',
  sex: 'M',
  age: '27',
  created_at: moment(),
  categories: [
    {
      title: 'Chief Complain',
      log: [
        {
          accuracy: 88.92,
          text: 'Rt. Hip Pain, onset 2017.09',
        },
      ],
    },
    {
      title: 'Present Illness',
      log: [
        {
          accuracy: 86.36,
          text: 'Cane Ambulation(+), onset 2017.10',
        },
      ],
    },
    {
      title: 'Past Medical history',
      log: [
        {
          accuracy: 82.73,
          text: 'Cane Ambulation(+), onset 2017.10',
        },
        {
          accuracy: 56.24,
          text: 'Op Hx : none',
        },
      ],
    },
    {
      title: 'Personal History',
      log: [
        {
          accuracy: 94.93,
          text: 'Alcohol (+) : 20년 이상, 소주 1병 / d',
        },
        {
          accuracy: 96.21,
          text: '금주, onset 2017.06',
        },
      ],
    },
    {
      title: 'Review of System',
      log: [
        {
          accuracy: 94.93,
          text: 'Musculoskeletal',
        },
        {
          accuracy: 96.21,
          text: 'Rt. Hip Pain (+)',
        },
        {
          accuracy: 96.21,
          text: 'Lt. Hip Pain (-)',
        },
        {
          accuracy: 76.23,
          text: 'LBP (+)',
        },
      ],
    },
    {
      title: 'Physical Examination',
      log: [
        {
          accuracy: 89.23,
          text: 'ROM',
        },
        {
          accuracy: 96.21,
          text: 'Limping gait (+)',
        },
        {
          accuracy: 94.98,
          text: 'LLD (-)',
        },
        {
          accuracy: 83.53,
          text: 'Patric test (+ / -)',
        },
        {
          accuracy: 75.38,
          text: 'Impingement (+ / -)',
        },
        {
          accuracy: 96.21,
          text: 'Hello',
        },
      ],
    },
  ],
};

export default class Dashboard extends Component<Props, State> {
  state = { data: { id: null } };

  componentDidMount() {
    this.setState({ data: getChart(1) });
  }

  render() {
    return (
      <Flex dir="column">
        <InfoBar data={data} />
        <styled.Container>
          {data.categories.map(item => (
            <Category item={item} key={item.title} />
          ))}
        </styled.Container>
      </Flex>
    );
  }
}
