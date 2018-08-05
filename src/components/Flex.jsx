// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  dir?: 'column' | 'row',
  option?: string,
};

const Flex = styled.div`
  flex: 1;
  display: flex;
  ${props => props.dir === 'column' && `flex-direction: column;`};
  ${props => props.option && props.option};
`;

export default (props: Props) => (
  <Flex dir={props.dir} option={props.option}>
    {props.children}
  </Flex>
);
