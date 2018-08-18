// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { updateItem, deleteItem } from '../../modules/chart';
import * as styled from './Styled';
import { mixin } from '../../styles';
// flow
import type { Item, ChartItem } from '../../modules/chart';

const MENU_NAME = {
  EDIT: '편집',
  AUDIO: '원본 (음성)',
  SCRIPT: '원본 (텍스트)',
  DELETE: '삭제',
};

type Menu = {|
  +name:
    | typeof MENU_NAME.EDIT
    | typeof MENU_NAME.AUDIO
    | typeof MENU_NAME.SCRIPT
    | typeof MENU_NAME.DELETE,
|};

type ContextProps = {
  +item: Menu,
  +handleContextClick: Function,
};

type Props = {
  info: ChartItem,
  category: string,
  // dispatch function
  UpdateItem: Function,
  DeleteItem: Function,
};

type State = {
  editMode: boolean,
};

const menu: Array<Menu> = [
  { name: MENU_NAME.EDIT },
  { name: MENU_NAME.AUDIO },
  { name: MENU_NAME.SCRIPT },
  { name: MENU_NAME.DELETE },
];

const ContextMenuItem = ({ item, handleContextClick }: ContextProps) => (
  <MenuItem data={{ name: item.name }} onClick={handleContextClick}>
    <styled.MenuItem>
      <styled.MenuItemMessage>{item.name}</styled.MenuItemMessage>
    </styled.MenuItem>
  </MenuItem>
);

class CategoryItem extends Component<Props, State> {
  state = { editMode: false };

  handleContextClick = (e: Event, data: Menu) => {
    const { category, info, UpdateItem, DeleteItem } = this.props;
    switch (data.name) {
      case MENU_NAME.EDIT:
        const text = '텍스트를 이렇게 바꿀거에요';
        UpdateItem({ category, index: info.index, nextText: text });
        break;
      case MENU_NAME.AUDIO:
        break;
      case MENU_NAME.SCRIPT:
        break;
      case MENU_NAME.DELETE:
        DeleteItem({ category, index: info.index });
        break;
      default:
    }
  };

  render() {
    const { info } = this.props;
    // *** GENERATE RANDOM HASH
    const hash = Math.random()
      .toString(36)
      .substr(2, 9);

    const accuracy = info.accuracy ? info.accuracy : 100;
    const color = mixin.accuracyToColor(accuracy);
    const percent = `${parseInt(accuracy, 10)}%`;

    return (
      <Fragment>
        <ContextMenuTrigger id={hash}>
          <styled.ItemWrapper>
            <styled.ItemAccuracy color={color}>{percent}</styled.ItemAccuracy>
            <styled.ItemText color={color}>{info.text}</styled.ItemText>
          </styled.ItemWrapper>
        </ContextMenuTrigger>
        <styled.Menu id={hash}>
          {menu.map(item => (
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
