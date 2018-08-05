import styled from 'styled-components';
import { size, color } from '../../styles';

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

const Hr = styled.div`
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
  /* font */
  color: ${color.white};
`;

const ButtonProgress = Button.extend`
  background-color: ${color.white};
  border: ${color.green} ${size.element.button_with_text.border} solid;
  /* font */
  color: ${color.green};
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

export default {
  Container,
  InfoContainer,
  InfoWrapper,
  InfoTitle,
  InfoContent,
  Hr,
  ButtonWrapper,
  ButtonReady,
  ButtonProgress,
  CategoryWrapper,
};
