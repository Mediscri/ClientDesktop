// @flow
import React, { Fragment } from 'react';
import * as styled from './Styled';
import Flex from '../../components/Flex';
import SessionButton from './SessionButton';
// type
import type { ChartNew } from '../../modules/chart';

type Props = {|
  data: ChartNew,
|};

const title = {
  name: '환자명',
  sex: '성별',
  age: '나이',
  created: '진료일자',
};

const InfoBar = ({ data }: Props) => (
  <styled.InfoContainer>
    {Object.keys(title).map(key => (
      <Fragment key={key}>
        <styled.InfoWrapper>
          <styled.InfoTitle>{title[key]}</styled.InfoTitle>
          <Flex dir="column" option="flex: 1; justify-content: flex-end;">
            <styled.InfoContent>
              {key === 'created'
                ? data[key].format('YYYY.MM.DD hh:mm')
                : data.patient[key]}
            </styled.InfoContent>
          </Flex>
        </styled.InfoWrapper>
        {key !== 'created' && <styled.Vr />}
      </Fragment>
    ))}
    <SessionButton />
  </styled.InfoContainer>
);

export default InfoBar;
