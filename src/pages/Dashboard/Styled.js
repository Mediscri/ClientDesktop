import styled from 'styled-components';
import { size, color } from '../../styles';

const Container = styled.div`
  flex-basis: ${size.container.dashboard};
  margin-right: ${size.space.between_components};
  background-color: ${color.white};
`;

export default { Container };
