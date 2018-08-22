// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styled from './Styled';
// component
import ModalBig from '../../components/ModalBig';
import InputGroup from '../../components/InputGroup';
// network
import { createChart } from '../../modules/chart';
// type
import type { PatientNew } from '../../networks/Patient';

type Props = { handleDismiss: Function, CreateChart: Function };
type State = PatientNew;

class CreateSession extends Component<Props, State> {
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
    const { CreateChart, handleDismiss } = this.props;
    const data = {
      ...this.state,
      age: parseInt(this.state.age, 10),
      gender: this.state.gender === '남' ? 0 : 1,
    };
    CreateChart(data);

    handleDismiss();
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

export default connect(
  state => ({}),
  dispatch => ({
    CreateChart: (data: PatientNew) => createChart(data)(dispatch),
  })
)(CreateSession);
