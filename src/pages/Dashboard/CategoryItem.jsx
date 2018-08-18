// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { updateItem, deleteItem } from '../../modules/chart';
import * as styled from './Styled';
import { mixin } from '../../styles';
// flow
import type { Item } from '../../modules/chart';

type data = { menu: string };
type menu = { name: string };

type MenuProps = {
  item: menu,
  handleContextClick: Function,
};

type Props = {
  info: {|
    text: string,
    index: number,
    accuracy?: number,
  |},
  category: string,
  // dispatch function
  UpdateItem: Function,
  DeleteItem: Function,
};

type State = {
  menu: Array<menu>,
};

const ContextMenuItem = ({ item, handleContextClick }: MenuProps) => (
  <MenuItem data={{ menu: item.name }} onClick={handleContextClick}>
    <styled.MenuItem>
      <styled.MenuItemMessage>{item.name}</styled.MenuItemMessage>
    </styled.MenuItem>
  </MenuItem>
);

class CategoryItem extends Component<Props, State> {
  state = {
    menu: [
      { name: '편집' },
      { name: '원본 (음성)' },
      { name: '원본 (텍스트)' },
      { name: '삭제' },
    ],
  };

  handleContextClick = (e: Event, data: data) => {
    const { category, info, UpdateItem, DeleteItem } = this.props;
    switch (data.menu) {
      case '편집':
        const text = '텍스트를 이렇게 바꿀거에요';
        UpdateItem({ category, index: info.index, nextText: text });
        break;
      case '원본 (음성)':
        break;
      case '원본 (텍스트)':
        break;
      case '삭제':
        DeleteItem({ category, index: info.index });
        break;
      default:
    }
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

export default connect(
  () => ({}),
  dispatch => ({
    UpdateItem: (data: Item) => updateItem(data)(dispatch),
    DeleteItem: (data: Item) => deleteItem(data)(dispatch),
  })
)(CategoryItem);
