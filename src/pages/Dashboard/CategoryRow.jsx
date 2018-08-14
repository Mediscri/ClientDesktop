// @flow
import React, { Component, Fragment } from 'react';
import { MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styled from './Styled';
import { mixin } from '../../styles';

type data = {
  message: string,
};

type menu = {
  name: string,
};

type MenuProps = {
  item: menu,
  handleContextClick: Function,
};

type Props = {
  info: {
    text: string,
    accuracy: number,
  },
};

type State = {
  menu: Array<menu>,
};

const ContextMenuItem = ({ item, handleContextClick }: MenuProps) => (
  <MenuItem
    data={{ message: `you clicked@${item.name}` }}
    onClick={handleContextClick}>
    <styled.Item>
      <styled.ItemMessage>{item.name}</styled.ItemMessage>
    </styled.Item>
  </MenuItem>
);

export default class CategoryRow extends Component<Props, State> {
  state = {
    menu: [
      { name: '편집' },
      { name: '원본 (음성)' },
      { name: '원본 (텍스트)' },
      { name: '삭제' },
    ],
  };

  handleContextClick = (e: Event, data: data) => {
    console.log(data);
  };

  render() {
    const { info } = this.props;
    const id = Math.random()
      .toString(36)
      .substr(2, 9);
    const color = mixin.accuracyToColor(info.accuracy);
    const accuracy = parseInt(info.accuracy, 10);

    return (
      <Fragment>
        <ContextMenuTrigger id={id}>
          <styled.RowWrapper>
            <styled.RowAccuracy color={color}>{accuracy}%</styled.RowAccuracy>
            <styled.RowText color={color}>{info.text}</styled.RowText>
          </styled.RowWrapper>
        </ContextMenuTrigger>
        <styled.Menu id={id}>
          {this.state.menu.map(item => (
            <ContextMenuItem
              item={item}
              handleContextClick={this.handleContextClick}
              key={item.name}
            />
          ))}
        </styled.Menu>
        <styled.HrSmall />
      </Fragment>
    );
  }
}
