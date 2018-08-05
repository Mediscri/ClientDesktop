// @flow
import React, { Component, Fragment } from 'react';
import styled from './Styled';
import Flex from '../../components/Flex';
import { mixin } from '../../styles';
// type
import type Moment from 'moment';
// svg
import dropdown from '../../icons/ic_dropdown.svg';

type Info = {
  name: string,
  accuracy: number,
  pi: string,
};

type Props = {
  data: {
    date: Moment,
    history: $ReadOnlyArray<Info>,
  },
};

type State = {
  showMore: boolean,
};

const Patient = ({ info }: { info: Info }) => {
  return (
    <styled.InfoWrapper>
      <Flex option="align-items: center;">
        <styled.AccuracyWrapper>
          <styled.InfoAccuracy color={mixin.accuracyToColor(info.accuracy)} />
        </styled.AccuracyWrapper>
        <styled.InfoName>{info.name}</styled.InfoName>
      </Flex>
      <Flex option="margin-top: 0.6rem;">
        {/* dummy area */}
        <styled.AccuracyWrapper />
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
