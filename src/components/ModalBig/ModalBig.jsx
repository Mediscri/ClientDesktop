// @flow
import * as React from 'react';
import * as styled from './Styled';
import close from '../../icons/ic_close.svg';

type Props = {
  children: React.Node,
  dismiss: Function,
  center?: boolean,
};

const ModalBig = ({ children, dismiss, center }: Props) => (
  <styled.Background onClick={dismiss}>
    <styled.Container onClick={e => e.stopPropagation()} center={center}>
      <styled.DismissWrapper onClick={dismiss}>
        <styled.DismissIcon src={close} />
      </styled.DismissWrapper>
      {children}
    </styled.Container>
  </styled.Background>
);

export default ModalBig;
