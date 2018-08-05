// @flow
import * as React from 'react';

import Flex from './Flex';

type Props = {
  children: React.Node,
};

const option = `
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

export default (props: Props) => (
  <Flex dir="column" option={option}>
    {props.children}
  </Flex>
);
