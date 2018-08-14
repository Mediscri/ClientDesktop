import styled from 'styled-components';
import { size, color } from '../../styles';

export const Background = styled.div`
  position: absolute;
  top: ${size.container.navbar};
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${color.gray_transparent};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  position: relative;
  width: ${size.container.modal_big.width};
  height: ${size.container.modal_big.height};
  box-sizing: border-box;
  padding: ${size.space.default} ${size.space.narrow};
  background-color: ${color.white};
  border-radius: 0.8rem;
  ${props =>
    props.center &&
    `display: flex;
    justify-content: center;
    align-items: center;
  `};
`;

export const DismissWrapper = styled.div`
  position: absolute;
  top: ${size.space.default};
  right: ${size.space.default};
  &:hover {
    cursor: pointer;
  }
`;

export const DismissIcon = styled.img`
  width: ${size.icon.close};
  object-fit: contain;
`;
