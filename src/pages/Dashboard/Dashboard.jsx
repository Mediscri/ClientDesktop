// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveItem } from '../../modules/chart';
import * as styled from './Styled';
import InfoBar from './InfoBar';
import Category from './Category';
import TextInput from './TextInput';
// type
import type { Chart, Move } from '../../modules/chart';

type Props = {
  data: Chart,
  MoveChart: Function,
};

type State = {
  isLoaded: boolean,
};

class Dashboard extends Component<Props, State> {
  state = { isLoaded: false };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data.id && !prevState.isLoaded) {
      return { isLoaded: true };
    }
    return null;
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
    MoveChart: (move: Move) => moveItem(move),
  })
)(Dashboard);
