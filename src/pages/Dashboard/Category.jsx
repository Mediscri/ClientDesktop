// @flow
import React, { Component, Fragment } from 'react';
import * as styled from './Styled';
// component
import CategroyItem from './CategoryItem';

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
        {log.map(info => (
          <Fragment key={info.text}>
            <CategroyItem info={info} />
            <styled.HrSmall />
          </Fragment>
        ))}
      </styled.CategoryWrapper>
    );
  }
}
