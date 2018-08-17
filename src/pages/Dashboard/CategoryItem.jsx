// @flow
import React, { Component, Fragment } from 'react';
import { MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import * as styled from './Styled';
import { mixin } from '../../styles';

type data = { message: string };
type menu = { name: string };

type MenuProps = {
  item: menu,
  handleContextClick: Function,
};

type Props = {
  info: {
    text: string,
    accuracy?: number,
  },
};

type State = {
  menu: Array<menu>,
};

const ContextMenuItem = ({ item, handleContextClick }: MenuProps) => (
  <MenuItem
    data={{ message: `you clicked@${item.name}` }}
    onClick={handleContextClick}>
    <styled.MenuItem>
      <styled.MenuItemMessage>{item.name}</styled.MenuItemMessage>
    </styled.MenuItem>
  </MenuItem>
);

export default class CategoryItem extends Component<Props, State> {
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

    const accuracy = info.accuracy ? info.accuracy : 100;
    const color = mixin.accuracyToColor(accuracy);
    const percent = `${parseInt(accuracy, 10)}%`;

    return (
      <Fragment>
        <ContextMenuTrigger id={id}>
          <styled.ItemWrapper>
            <styled.ItemAccuracy color={color}>{percent}</styled.ItemAccuracy>
            <styled.ItemText color={color}>{info.text}</styled.ItemText>
          </styled.ItemWrapper>
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
      </Fragment>
    );
  }
}
