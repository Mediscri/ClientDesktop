// @flow
import * as React from 'react';
import * as styled from './Styled';
import close from '../../icons/ic_close.svg';

type Props = {
  children: React.Node,
  dismiss: Function,
  center?: boolean,
};

export default class ModalBig extends React.Component<Props> {
  handleKeyDown = (e: Event) => {
    const ESC = 27;
    // $FlowFixMe
    if (e.keyCode === ESC) {
      this.props.dismiss();
    }
  };

  render() {
    const { children, dismiss, center } = this.props;
    return (
      <styled.Background
        onClick={dismiss}
        onKeyDown={this.handleKeyDown}
        tabIndex="0">
        <styled.Container onClick={e => e.stopPropagation()} center={center}>
          <styled.DismissWrapper onClick={dismiss}>
            <styled.DismissIcon src={close} />
          </styled.DismissWrapper>
          {children}
        </styled.Container>
      </styled.Background>
    );
  }
}
