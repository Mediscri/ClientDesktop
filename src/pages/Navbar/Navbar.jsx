// @flow
import React, { Component } from 'react';
import styled from './Styled';
// svg
import mediscri from '../../icons/ic_mediscri.svg';

export default class Navbar extends Component<{}> {
  render() {
    return (
      <styled.Container>
        <styled.Align align="left">
          <p>안녕하세요</p>
        </styled.Align>
        <styled.Align align="right">
          <p>안녕하세요</p>
        </styled.Align>
        <styled.IconMediscri src={mediscri} />
      </styled.Container>
    );
  }
}
