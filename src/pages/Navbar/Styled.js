import styled from 'styled-components';
import { color, size } from '../../styles';

const Container = styled.div`
  position: relative;
  flex-basis: ${size.container.navbar};
  margin-bottom: ${size.space.between_components};
  padding: 0 ${size.space.default};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color.white};
`;

const Align = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  /* align: left | right */
  ${props =>
    `${props.align}: 0;
    margin-${props.align}: ${size.space.default};`};
  display: flex;
  align-items: center;
`;

const IconMediscri = styled.img`
  width: ${size.icon.mediscri.small};
`;

export default { Container, Align, IconMediscri };
