// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { getChart, moveItem } from '../../modules/chart';
import * as styled from './Styled';
import InfoBar from './InfoBar';
import Category from './Category';
import TextInput from './TextInput';
// component
import Flex from '../../components/Flex';
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
    const { categories, ...patientInfo } = this.props.data;
    return (
      <Flex dir="column">
        {this.state.isLoaded && (
          <Fragment>
            <InfoBar data={patientInfo} />
            {/* TODO: Remove TextInput after classification test is done */}
            <TextInput />
            <styled.Container>
              {Object.keys(categories).map(key => (
                <Category item={categories[key]} category={key} key={key} />
              ))}
            </styled.Container>
          </Fragment>
        )}
      </Flex>
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
)(DragDropContext(HTML5Backend)(Dashboard));
