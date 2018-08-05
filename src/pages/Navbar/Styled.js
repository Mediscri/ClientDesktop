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
  object-fit: contain;
`;

// Search
const SearchWrapper = styled.div`
  width: ${size.element.search_input.width};
  height: ${size.element.search_input.height};
  border: ${size.element.search_input.border} solid ${color.medium_gray};
  border-radius: ${size.element.search_input.radius};
  display: flex;
`;

const SearchIcon = styled.img`
  width: ${size.icon.search};
  flex-basis: ${size.icon.search};
  object-fit: contain;
  margin: 0 0.8rem;
`;

const SerachInput = styled.input`
  flex: 1;
  height: 100%;
`;

// UserInfo
const HospitalInfo = styled.p`
  color: ${color.dark_gray};
  font-size: ${size.font['16']};
  font-weight: normal;
  margin-right: ${size.space.between_texts};
`;

const UserInfo = styled.p`
  color: ${color.dark_gray};
  font-size: ${size.font['16']};
  font-weight: lighter;
  margin-right: ${size.space.between_texts};
`;

const MenuIcon = styled.img`
  width: ${size.icon.dropdown.width};
  height: ${size.icon.dropdown.height};
`;

// Notice
const NoticeWrapper = styled.div`
  position: relative;
  margin-left: ${size.space.narrow};
`;

const NoticeIcon = styled.img`
  width: ${size.icon.notice};
  object-fit: contain;
`;

const NoticeBadge = styled.img`
  position: absolute;
  top: -0.4rem;
  right: 0;
  width: 1rem;
  height: 1rem;
`;

export default {
  Container,
  Align,
  IconMediscri,
  SearchWrapper,
  SearchIcon,
  SerachInput,
  HospitalInfo,
  UserInfo,
  MenuIcon,
  NoticeWrapper,
  NoticeIcon,
  NoticeBadge,
};
