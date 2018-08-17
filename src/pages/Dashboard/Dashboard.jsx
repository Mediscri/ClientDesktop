// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getChart } from '../../modules/chart';
import * as styled from './Styled';
import InfoBar from './InfoBar';
import Category from './Category';
// component
import Flex from '../../components/Flex';
// type
import type { Chart } from '../../modules/chart';

type Props = {
  data: Chart,
  GetChart: Function,
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
  })
)(Dashboard);
