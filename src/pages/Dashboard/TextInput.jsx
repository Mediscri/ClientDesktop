// @flow
import React, { Component } from 'react';
// network
// import { Socket } from '../../networks';

type Props = {};

type State = {
  socketOpen: boolean,
};

class TextInput extends Component<Props, State> {
  state = { socketOpen: false };

  componentDidMount() {}

  render() {
    return <div />;
  }
}

export default TextInput;
