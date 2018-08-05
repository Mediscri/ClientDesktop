import styled from 'styled-components';
import { size, color } from '../../styles';

const Container = styled.div`
  flex-basis: ${size.container.sidebar};
  box-sizing: border-box;
  margin-right: ${size.space.between_components};
  background-color: ${color.white};
  padding: ${size.space.between_contents} ${size.space.default};
  display: flex;
  flex-direction: column;
`;

const CreateBoard = styled.a`
  width: 100%;
  height: ${size.element.button_with_text.height};
  border-radius: ${size.element.button_with_text.radius};
  background-color: ${color.green};
  display: flex;
  justify-content: center;
  align-items: center;
  /* font */
  color: ${color.white};
  font-size: ${size.font['16']};
  font-weight: normal;
`;

// history
const HistoryContainer = styled.div`
  flex: 1;
  margin-top: ${size.space.between_contents};
  overflow-y: scroll;
`;

const HistoryWrapper = styled.div`
  width: 100%;
  padding: ${size.space.wrapper} 0;
`;

const Header = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

const HistoryDate = styled.p`
  color: ${color.black};
  font-size: ${size.font['16']};
  font-weight: normal;
`;

const DropdownWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Dropdown = styled.img`
  width: ${size.icon.dropdown.width};
  height: ${size.icon.dropdown.height};
  transform: rotate(${props => (props.showMore ? 180 : 0)}deg);
  transition: transform 0.4s ease-out;
`;

const Hr = styled.div`
  width: 100%;
  border: ${color.lighter_gray} 1px solid;
`;

const InfoWrapper = styled.div`
  margin-top: ${size.space.wrapper};
`;

const AccuracyWrapper = styled.div`
  flex-basis: ${size.wrapper.status.width};
  display: flex;
`;

const InfoAccuracy = styled.div`
  width: ${size.icon.patient_status};
  height: ${size.icon.patient_status};
  background-color: ${props => props.color};
  border-radius: 0.6rem;
`;

const InfoName = styled.p`
  flex: 1;
  color: ${color.black};
  font-size: ${size.font['16']};
  font-weight: lighter;
`;

const InfoPI = styled.p`
  flex: 1;
  color: ${color.medium_gray};
  font-size: ${size.font['14']};
  font-weight: lighter;
`;

export default {
  Container,
  CreateBoard,
  // history
  HistoryContainer,
  HistoryWrapper,
  Header,
  Dropdown,
  HistoryDate,
  DropdownWrapper,
  Hr,
  // info
  InfoWrapper,
  AccuracyWrapper,
  InfoAccuracy,
  InfoName,
  InfoPI,
};
