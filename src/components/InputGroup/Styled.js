import styled from 'styled-components';
import { size, color } from '../../styles';

export const InputContainer = styled.div`
  margin: ${size.space.title_content} 0;
`;

export const InputWrapper = styled.div`
  width: ${size.element.input.width};
  margin-bottom: ${size.space.between_contents};
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const InputTitle = styled.p`
  color: ${color.dark_gray};
  font-size: ${size.font['18']};
  font-weight: lighter;
  margin-bottom: ${size.space.name_content};
`;

const InputForm = styled.input`
  height: ${size.element.input.height};
  border: ${color.lighter_gray} ${size.element.input.border} solid;
  border-radius: ${size.element.input.radius};
  box-sizing: border-box;
  font-size: ${size.font['16']};
`;

export const Input = InputForm.extend`
  width: 100%;
  padding: 0 ${size.space.between_texts};
  &:focus {
    border-color: ${color.green};
  }
`;

export const InputCheck = InputForm.extend`
  flex: 1;
  color: ${color.lighter_gray};
  margin-right: ${size.space.default};
  text-align: center;
  &:last-of-type {
    margin-right: 0;
  }
  ${props =>
    props.isFocus
      ? `border-color: ${color.green};
    background-color: ${color.green};
    color: ${color.white};`
      : `&:hover {
    border-color: ${color.green};
    color: ${color.green};
    cursor: pointer;
  }`};
`;
