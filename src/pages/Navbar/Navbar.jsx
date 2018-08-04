// @flow
import React, { Component } from 'react';
import styled from './Styled';
// svg
import mediscri from '../../icons/ic_mediscri.svg';
import search from '../../icons/ic_search.svg';
import dropdown from '../../icons/ic_dropdown.svg';
//// notice icons
import notice_gray from '../../icons/ic_notice_gray.svg';
import notice_green from '../../icons/ic_notice_green.svg';
import notice_badge from '../../icons/ic_notice_badge.svg';

export default class Navbar extends Component<{}> {
  state = { notice: { isHover: false, exist: false } };

  handleNoticeHover = () =>
    this.setState({
      notice: { ...this.state.notice, isHover: !this.state.notice.isHover },
    });

  NoticeArea = () => {
    const { isHover, exist } = this.state.notice;

    return (
      <styled.NoticeWrapper
        onMouseEnter={this.handleNoticeHover}
        onMouseLeave={this.handleNoticeHover}>
        <styled.NoticeIcon src={isHover ? notice_green : notice_gray} />
        {exist && <styled.NoticeBadge src={notice_badge} />}
      </styled.NoticeWrapper>
    );
  };

  render() {
    return (
      <styled.Container>
        <styled.Align align="left">
          <form>
            <styled.SearchWrapper>
              <styled.SearchIcon src={search} />
              <styled.SerachInput type="text" />
            </styled.SearchWrapper>
          </form>
        </styled.Align>
        <styled.Align align="right">
          <styled.HospitalInfo>동수원 병원</styled.HospitalInfo>
          <styled.UserInfo>전명훈</styled.UserInfo>
          <styled.MenuIcon src={dropdown} />
          {this.NoticeArea()}
        </styled.Align>
        <styled.IconMediscri src={mediscri} />
      </styled.Container>
    );
  }
}
