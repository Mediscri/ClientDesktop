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
import type Moment from 'moment';

type Data = {|
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
|};

type Props = {
  data: Data,
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
    const { categories } = this.props.data;
    return (
      <Flex dir="column">
        {this.state.isLoaded && (
          <Fragment>
            <InfoBar data={this.props.data} />
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
