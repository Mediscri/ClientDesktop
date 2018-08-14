import styled from 'styled-components';
import { ContextMenu } from 'react-contextmenu';
import { size, color, mixin } from '../../styles';

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  margin: 0 0 ${size.space.between_categroies} -${size.space.between_categroies};
  overflow-y: scroll;
`;

// info
const InfoContainer = styled.div`
  height: ${size.container.navbar};
  box-sizing: border-box;
  padding: ${size.space.narrow} ${size.space.default};
  background-color: ${color.white};
  display: flex;
`;

const InfoWrapper = styled.div`
  flex-basis: ${size.wrapper.info.width};
  display: flex;
  flex-direction: column;
  margin-left: ${size.space.default};
  &:first-of-type {
    margin-left: 0;
  }
`;

const InfoTitle = styled.p`
  color: ${color.light_gray};
  font-size: ${size.font['14']};
  font-weight: normal;
`;

const InfoContent = styled.p`
  color: ${color.black};
  font-size: ${size.font['20']};
`;

const Vr = styled.div`
  height: 100%;
  border: ${color.lighter_gray} 1px solid;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.div`
  width: ${size.element.button_with_text.width};
  height: ${size.element.button_with_text.height};
  border-radius: ${size.element.button_with_text.radius};
  display: flex;
  justify-content: center;
  align-items: center;
  /* font */
  font-size: ${size.font['16']};
  &:hover {
    cursor: pointer;
  }
`;

const ButtonReady = Button.extend`
  background-color: ${color.green};
  border: ${color.green} ${size.element.button_with_text.border} solid;
  /* font */
  color: ${color.white};
`;

const ButtonProgress = Button.extend`
  background-color: ${color.white};
  border: ${color.green} ${size.element.button_with_text.border} solid;
  /* font */
  color: ${color.green};
  &:hover {
    background-color: ${color.green};
    /* font */
    color: ${color.white};
  }
`;

// category
const CategoryWrapper = styled.div`
  width: ${size.wrapper.category.width};
  min-height: ${size.wrapper.category.height};
  box-sizing: border-box;
  padding: 2.4rem 2rem;
  background-color: ${color.white};
  margin: ${size.space.between_categroies} 0 0 ${size.space.between_categroies};
`;

const CategoryTitle = styled.h3`
  color: ${color.black};
  font-size: ${size.font['16']};
  font-weight: normal;
`;

const HrLarge = styled.div`
  width: 100%;
  border: ${color.lighter_gray} 1px solid;
  margin: ${size.space['20']} 0 ${size.space['6']};
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RowAccuracy = styled.div`
  width: ${size.element.accuracy.size};
  height: ${size.element.accuracy.size};
  border-radius: ${size.element.accuracy.radius};
  margin-right: 1rem;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  /* font */
  color: ${color.white};
  font-size: ${size.font['10']};
`;

const RowText = styled.p`
  color: ${props => (props.color ? props.color : color.black)};
  font-size: ${size.font['14']};
  margin: ${size.space['14']} 0;
`;

const HrSmall = styled.div`
  margin-left: ${mixin.calcSize(`${size.element.accuracy.size} + 1rem`)};
  border: ${color.lighter_gray} 0.5px solid;
  &:last-of-type {
    border: none;
  }
`;

// context
const Menu = styled(ContextMenu)`
  min-width: ${size.container.context};
  padding: ${size.space['8']} ${size.space['12']};
  background-color: ${color.white};
  border: ${size.element.context.border} ${color.dark_gray} solid;
  border-radius: ${size.element.context.radius};
`;

const Item = styled.div`
  padding: ${size.space['6']};
  margin: 0 -${size.space['6']};
  &:hover {
    cursor: default;
    background-color: ${color.lighter_gray};
  }
`;

const ItemMessage = styled.p`
  color: ${color.black};
  font-size: ${size.font['14']};
`;

export default {
  Container,
  InfoContainer,
  InfoWrapper,
  InfoTitle,
  InfoContent,
  Vr,
  ButtonWrapper,
  ButtonReady,
  ButtonProgress,
  CategoryWrapper,
  CategoryTitle,
  HrLarge,
  RowWrapper,
  RowAccuracy,
  RowText,
  HrSmall,
  Menu,
  Item,
  ItemMessage,
};
