// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getChart, moveItem } from '../../modules/chart';
import * as styled from './Styled';
import InfoBar from './InfoBar';
import Category from './Category';
import TextInput from './TextInput';
// type
import type { Chart, Move } from '../../modules/chart';

type Props = {
  data: Chart,
  GetChart: Function,
  MoveChart: Function,
};

type State = {
  isLoaded: boolean,
};

class Dashboard extends Component<Props, State> {
  state = { isLoaded: false };

  componentDidMount() {
    const { GetChart } = this.props;
    GetChart(1).then(() => this.setState({ isLoaded: true }));
  }

  render() {
    const { data } = this.props;
    const { categories, ...patientInfo } = data;

    return (
      this.state.isLoaded && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <InfoBar data={patientInfo} />
          {/* TODO: Remove TextInput after classification test is done */}
          <TextInput />
          <styled.Container>
            {Object.keys(categories).map(key => (
              <Category item={categories[key]} category={key} key={key} />
            ))}
          </styled.Container>
        </div>
      )
    );
  }
}

export default connect(
  state => ({
    data: state.chart,
  }),
  dispatch => ({
    GetChart: (id: number) => getChart(id)(dispatch),
    MoveChart: (move: Move) => moveItem(move),
  })
)(Dashboard);
