/**
 * ### NOTICE
 * > Created by JWWon
 * This Component is created for classification test
 * It must removed after classification test is complete.
 */

// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// network
import { socket } from '../../networks';
// type
import type { State as SocketState } from '../../modules/socket';

import { size, color } from '../../styles';

type Props = { ...SocketState, patientId: number };

type State = {
  sentence: string,
};

const Container = styled.div`
  display: flex;
  margin-top: 0.6rem;
  height: 4rem;
`;

const Input = styled.input`
  flex: 1;
  border: ${color.green} ${size.element.input.border} solid;
  border-radius: ${size.element.input.radius};
  padding: 0 ${size.space.between_texts};
  box-sizing: border-box;
  font-size: ${size.font['16']};
`;

const Send = styled.button`
  flex-basis: 12rem;
  background: ${color.green};
  margin: 0 0.6rem;
  border-radius: ${size.element.input.radius};
  font-size: ${size.font['16']};
  color: ${color.white};
`;

class TextInput extends Component<Props, State> {
  state = { sentence: '' };

  handleChage = (e: SyntheticInputEvent<EventTarget>) =>
    this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e: Event) => {
    e.preventDefault();
    socket.send({ ...this.state, patient_id: this.props.patientId });
    this.setState({ sentence: '' });
  };

  render() {
    const { readyState } = this.props;
    return (
      readyState === 'OPEN' && (
        <form onSubmit={this.handleSubmit}>
          <Container>
            <Input
              type="text"
              name="sentence"
              onChange={this.handleChage}
              value={this.state.sentence}
            />
            <Send type="submit">send</Send>
          </Container>
        </form>
      )
    );
  }
}

export default connect(state => ({
  readyState: state.socket.readyState,
  patientId: state.chart.patient.id,
}))(TextInput);
