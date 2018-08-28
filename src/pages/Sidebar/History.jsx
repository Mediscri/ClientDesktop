// @flow
import React, { Component, Fragment } from 'react';
import * as styled from './Styled';
import Flex from '../../components/Flex';
// svg
import dropdown from '../../icons/ic_dropdown.svg';
// type
import type { Data, Item } from '../../modules/chartList';
import type { BrowserHistory } from 'history';

type PatientProps = { item: Item, handleClick: Function };

type Props = { data: Data, history: BrowserHistory };

type State = {
  isToday: boolean,
  showMore: boolean,
};

const Patient = ({ item, handleClick }: PatientProps) => {
  return (
    <styled.InfoWrapper onClick={() => handleClick(item.id)}>
      <Flex option="align-items: center;">
        <styled.AccuracyWrapper>
          <styled.InfoAccuracy color="#EDEEEC" />
        </styled.AccuracyWrapper>
        <styled.InfoName>{item.patient.name}</styled.InfoName>
      </Flex>
      <Flex option="margin-top: 0.6rem;">
        {/* dummy area */}
        <styled.AccuracyWrapper />
        <styled.InfoCC>CC: {item.cc}</styled.InfoCC>
      </Flex>
    </styled.InfoWrapper>
  );
};

export default class History extends Component<Props, State> {
  state = { isToday: false, showMore: false };

  componentDidMount() {
    if (this.props.data.date.isSame(new Date(), 'day')) {
      this.setState({ isToday: true, showMore: true });
    }
  }

  handleShowMore = () => this.setState({ showMore: !this.state.showMore });
  handleClick = (chart_id: string) =>
    this.props.history.push(`/dashboard/${chart_id}`);

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <styled.HistoryWrapper>
          <styled.Header onClick={this.handleShowMore}>
            <styled.HistoryDate>
              {this.state.isToday ? 'Today' : data.date.format('YYYY.MM.DD')}
            </styled.HistoryDate>
            <styled.DropdownWrapper>
              <styled.Dropdown src={dropdown} showMore={this.state.showMore} />
            </styled.DropdownWrapper>
          </styled.Header>
          {this.state.showMore &&
            data.history.map((item: Item) => (
              <Patient
                item={item}
                handleClick={this.handleClick}
                key={item.id}
              />
            ))}
        </styled.HistoryWrapper>
        <styled.Hr />
      </Fragment>
    );
  }
}
