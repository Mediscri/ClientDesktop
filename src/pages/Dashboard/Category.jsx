// @flow
import React, { Component, Fragment } from 'react';
import styled from './Styled';
import Flex from '../../components/Flex';
import { mixin } from '../../styles';

type LogType = {
  accuracy: number,
  text: string,
};

type Props = {
  item: {
    title: string,
    log: $ReadOnlyArray<LogType>,
  },
};

export default class Category extends Component<Props> {
  render() {
    const { title, log } = this.props.item;
    return (
      <styled.CategoryWrapper>
        <styled.CategoryTitle>{title}</styled.CategoryTitle>
        <styled.HrLarge />
        {log.map(info => {
          const color = mixin.accuracyToColor(info.accuracy);
          return (
            <Fragment key={info.text}>
              <Flex option="align-items: center;">
                <styled.LogAccuracy color={color}>
                  {`${parseInt(info.accuracy, 10)}%`}
                </styled.LogAccuracy>
                <styled.LogText color={color}>{info.text}</styled.LogText>
              </Flex>
              <styled.HrSmall />
            </Fragment>
          );
        })}
      </styled.CategoryWrapper>
    );
  }
}
