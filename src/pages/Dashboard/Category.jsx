// @flow
import React, { Component } from 'react';
import styled from './Styled';

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
        <p>{title}</p>
        {log.map(info => <p key={info.text}>{info.text}</p>)}
      </styled.CategoryWrapper>
    );
  }
}
