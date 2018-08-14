// @flow
import React from 'react';
import * as styled from './Styled';
// component
import Flex from '../../components/Flex';

type Data = {
  title: string,
  name: string,
  type?: 'text' | 'number' | 'email' | 'button',
  curVal?: string,
  values?: Array<string>,
};

type InputProps = {
  data: Data,
  handleChange: Function,
};

type Props = {
  datas: Array<Data>,
  handleChange: Function,
};

const Input = ({ data, handleChange }: InputProps) => {
  let render = <div />;
  if (data.type === 'button') {
    render = (
      <Flex>
        {data.values &&
          data.values.map(value => (
            <styled.InputCheck
              type="button"
              name={data.name}
              value={value}
              isFocus={data.curVal === value}
              onClick={handleChange}
              key={value}
            />
          ))}
      </Flex>
    );
  } else {
    render = (
      <styled.Input
        name={data.name}
        type={data.type || 'text'}
        onChange={handleChange}
      />
    );
  }

  return (
    <styled.InputWrapper>
      <styled.InputTitle>{data.title} :</styled.InputTitle>
      {render}
    </styled.InputWrapper>
  );
};

const InputGroup = ({ datas, handleChange }: Props) => (
  <styled.InputContainer>
    {datas.map(data => (
      <Input data={data} handleChange={handleChange} key={data.name} />
    ))}
  </styled.InputContainer>
);

export default InputGroup;
