// @flow
import React, { Component } from 'react';
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
  +menu: Menu,
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
  text: string,
};

const menuList: Array<Menu> = [
  { name: MENU_NAME.EDIT },
  { name: MENU_NAME.AUDIO },
  { name: MENU_NAME.SCRIPT },
  { name: MENU_NAME.DELETE },
];

const ContextMenuItem = ({ menu, handleContextClick }: ContextProps) => (
  <MenuItem data={menu} onClick={handleContextClick}>
    <styled.MenuItemWrapper>
      <styled.MenuName>{menu.name}</styled.MenuName>
    </styled.MenuItemWrapper>
  </MenuItem>
);

class CategoryItem extends Component<Props, State> {
  state = { editMode: false, text: this.props.info.text };

  handleContextClick = (e: Event, data: Menu) => {
    const { category, info, DeleteItem } = this.props;
    switch (data.name) {
      case MENU_NAME.EDIT:
        if (!this.state.editMode) {
          this.setState({ editMode: true });
        }
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

  handleDoubleClick = (e: Event) => {
    if (!this.state.editMode) {
      this.setState({ editMode: true });
    }
  };

  handleChage = (e: SyntheticInputEvent<EventTarget>) =>
    this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e: Event) => {
    const { category, info, UpdateItem } = this.props;
    e.preventDefault();

    UpdateItem({ category, index: info.index, nextText: this.state.text });
    this.setState({ editMode: false });
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
      <div>
        <ContextMenuTrigger id={hash}>
          <styled.ItemWrapper onDoubleClick={this.handleDoubleClick}>
            <styled.ItemAccuracy color={color}>{percent}</styled.ItemAccuracy>
            {this.state.editMode ? (
              <styled.ItemEditForm onSubmit={this.handleSubmit}>
                <styled.ItemEdit
                  autoFocus
                  name="text"
                  value={this.state.text}
                  onChange={this.handleChage}
                  onBlur={this.handleSubmit}
                />
              </styled.ItemEditForm>
            ) : (
              <styled.ItemText color={color}>{info.text}</styled.ItemText>
            )}
          </styled.ItemWrapper>
        </ContextMenuTrigger>
        <styled.MenuContainer id={hash}>
          {menuList.map(menu => (
            <ContextMenuItem
              menu={menu}
              handleContextClick={this.handleContextClick}
              key={menu.name}
            />
          ))}
        </styled.MenuContainer>
      </div>
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
