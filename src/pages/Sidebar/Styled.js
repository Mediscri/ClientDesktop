import styled from 'styled-components';
import { size, color } from '../../styles';

export const Container = styled.div`
  flex-basis: ${size.container.sidebar};
  box-sizing: border-box;
  margin-right: ${size.space.between_components};
  background-color: ${color.white};
  padding: ${size.space.between_contents} ${size.space.default};
  display: flex;
  flex-direction: column;
`;

export const CreateChart = styled.div`
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
  &:hover {
    cursor: pointer;
  }
`;

// history
export const HistoryContainer = styled.div`
  flex: 1;
  margin-top: ${size.space.between_contents};
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export const HistoryWrapper = styled.div`
  width: 100%;
  padding: ${size.space.wrapper} 0;
`;

export const Header = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

export const HistoryDate = styled.p`
  color: ${color.black};
  font-size: ${size.font['16']};
  font-weight: normal;
`;

export const DropdownWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Dropdown = styled.img`
  width: ${size.icon.dropdown.width};
  height: ${size.icon.dropdown.height};
  transform: rotate(${props => (props.showMore ? 180 : 0)}deg);
  transition: transform 0.4s ease-out;
`;

export const Hr = styled.div`
  width: 100%;
  border: ${color.lighter_gray} 1px solid;
`;

export const InfoWrapper = styled.div`
  margin-top: ${size.space.wrapper};
`;

export const AccuracyWrapper = styled.div`
  flex-basis: ${size.wrapper.status.width};
  display: flex;
`;

export const InfoAccuracy = styled.div`
  width: ${size.icon.patient_status};
  height: ${size.icon.patient_status};
  background-color: ${props => props.color};
  border-radius: 0.6rem;
`;

export const InfoName = styled.p`
  flex: 1;
  color: ${color.black};
  font-size: ${size.font['16']};
  font-weight: lighter;
`;

export const InfoCC = styled.p`
  flex: 1;
  color: ${color.medium_gray};
  font-size: ${size.font['14']};
  font-weight: lighter;
`;

// modal
export const ModalWrapper = styled.div`
  width: ${size.wrapper.input.width};
`;

export const ModalTitle = styled.h3`
  color: ${color.green};
  font-size: ${size.font['26']};
  font-weight: normal;
`;

// export const ModalInputWrapper = styled.div`
//   margin: ${size.space.title_content} 0;
// `;

// export const ModalInputText = styled.p`
//   color: ${color.dark_gray};
//   font-size: ${size.font['18']};
//   font-weight: lighter;
//   margin-bottom: ${size.space.name_content};
// `;

// export const ModalInput = styled.input`
//   width: ${size.element.input.width};
//   height: ${size.element.input.height};
//   border: ${color.lighter_gray} ${size.element.input.border} solid;
//   border-radius: ${size.element.input.radius};
//   padding: 0 ${size.space.between_texts};
//   box-sizing: border-box;
//   font-size: ${size.font['16']};
//   margin-bottom: ${size.space.between_contents};
//   &:last-of-type {
//     margin-bottom: 0;
//   }
// `;

export const ModalButton = styled.button`
  width: ${size.element.input.width};
  height: ${size.element.input.height};
  border: ${color.green} ${size.element.input.border} solid;
  border-radius: ${size.element.input.radius};
  background: ${color.green};
  box-sizing: border-box;
  font-size: ${size.font['16']};
  color: ${color.white};
  &:hover {
    cursor: pointer;
  }
`;
