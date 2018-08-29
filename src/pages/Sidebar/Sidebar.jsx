// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styled from './Styled';
import { getChartListByDate } from '../../modules/chartList';
// component
import History from './History';
import CreateSession from './CreateSession';
// type
import type { ChartList } from '../../modules/chartList';
import type { BrowserHistory } from 'history';

type Props = {
  chartList: ChartList,
  auth: { token: string },
  GetListByDate: Function,
  history: BrowserHistory,
};

type State = {
  create_chart: boolean,
  getList: boolean,
};

class Sidebar extends Component<Props, State> {
  state = { create_chart: false, getList: false };

  handleClickCreate = () => this.setState({ create_chart: true });
  handleDismiss = () => this.setState({ create_chart: false });

  static getDerivedStateFromProps(nextProps, prevState) {
    const { auth, GetListByDate, history } = nextProps;

    // *** AUTH 설정 완료 후
    if (auth.token && !prevState.getList) {
      GetListByDate(true, history);
      return { getList: true };
    }
    return null;
  }

  render() {
    const { list } = this.props.chartList;
    return (
      <styled.Container>
        <styled.CreateSession onClick={this.handleClickCreate}>
          신규 진료
        </styled.CreateSession>
        <styled.HistoryContainer>
          <styled.Hr />
          {list.map(data => (
            <History data={data} history={this.props.history} key={data.date} />
          ))}
        </styled.HistoryContainer>
        {this.state.create_chart && (
          <CreateSession handleDismiss={this.handleDismiss} />
        )}
      </styled.Container>
    );
  }
}

export default connect(
  state => ({
    chartList: state.chartList,
    auth: state.auth,
  }),
  dispatch => ({
    GetListByDate: (created_today?: boolean, history?: BrowserHistory) =>
      getChartListByDate(created_today, history)(dispatch),
  })
)(Sidebar);
