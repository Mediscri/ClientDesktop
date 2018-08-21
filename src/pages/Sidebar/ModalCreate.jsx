// @flow
import React, { Component } from 'react';
import * as styled from './Styled';
// component
import ModalBig from '../../components/ModalBig';
import InputGroup from '../../components/InputGroup';

type Props = {
  handleDismiss: Function,
};

type State = {
  name: string,
  age: number,
  gender: 'M' | 'F',
};

export default class ModalCreate extends Component<Props, State> {
  state = {
    name: '',
    // $FlowFixMe
    age: null,
    // $FlowFixMe
    gender: null,
  };

  handleChange = (e: SyntheticInputEvent<EventTarget>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <ModalBig dismiss={this.props.handleDismiss} center>
        <styled.ModalWrapper>
          <styled.ModalTitle>신규 진료 등록하기</styled.ModalTitle>
          <form onSubmit={this.handleSubmit}>
            <InputGroup
              datas={[
                { title: '환자 이름', name: 'name' },
                {
                  title: '성별',
                  name: 'gender',
                  type: 'button',
                  curVal: this.state.gender,
                  values: ['남', '여'],
                },
                { title: '나이', name: 'age', type: 'number' },
              ]}
              handleChange={this.handleChange}
            />
            <styled.ModalButton type="submit">SUBMIT</styled.ModalButton>
          </form>
        </styled.ModalWrapper>
      </ModalBig>
    );
  }
}
