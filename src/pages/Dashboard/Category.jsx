// @flow
import React, { Component } from 'react';
import styled from './Styled';
// component
import CategroyRow from './CategoryRow';

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
        {log.map(info => <CategroyRow info={info} key={info.text}/>)}
      </styled.CategoryWrapper>
    );
  }
}
