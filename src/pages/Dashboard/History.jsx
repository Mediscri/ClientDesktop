// @flow
import React, { Component, Fragment } from 'react';
import styled from './Styled';
import Flex from '../../components/Flex';
// svg
import dropdown from '../../icons/ic_dropdown.svg';

type Info = {
  name: string,
  accuracy: number,
  pi: string,
};

type Props = {
  data: {
    date: string,
    history: $ReadOnlyArray<Info>,
  },
};

type State = {
  showMore: boolean,
};

const ClassifyStatus = (accuracy: number) => {
  if (accuracy < 70) {
    return '#D14040';
  } else if (accuracy < 80) {
    return '#F9C433';
  } else {
    return '#429D51';
  }
};

const Patient = ({ info }: Info) => {
  return (
    <styled.InfoWrapper>
      <Flex option="align-items: center;">
        <styled.StatusWrapper>
          <styled.InfoStatus status={ClassifyStatus(info.accuracy)} />
        </styled.StatusWrapper>
        <styled.InfoName>{info.name}</styled.InfoName>
      </Flex>
      <Flex option="margin-top: 0.6rem;">
        {/* dummy area */}
        <styled.StatusWrapper />
        <styled.InfoPI>PI: {info.pi}</styled.InfoPI>
      </Flex>
    </styled.InfoWrapper>
  );
};

export default class History extends Component<Props, State> {
  state = { showMore: false };

  componentDidMount() {
    if (this.props.data.date.isSame(new Date(), 'day')) {
      this.setState({ showMore: true });
    }
  }

  handleShowMore = () => this.setState({ showMore: !this.state.showMore });

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <styled.HistoryWrapper>
          <styled.Header onClick={this.handleShowMore}>
            <styled.HistoryDate>
              {data.date.format('YYYY.MM.DD')}
            </styled.HistoryDate>
            <styled.DropdownWrapper>
              <styled.Dropdown src={dropdown} showMore={this.state.showMore} />
            </styled.DropdownWrapper>
          </styled.Header>
          {this.state.showMore &&
            data.history.map((info: Info) => (
              <Patient info={info} key={info.name} />
            ))}
        </styled.HistoryWrapper>
        <styled.Hr />
      </Fragment>
    );
  }
}
