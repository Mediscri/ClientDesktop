// @flow
import React, { Component, Fragment } from 'react';
import * as styled from './Styled';
// component
import CategroyItem from './CategoryItem';
// type
import type { ChartItem } from '../../modules/chart';

type Props = {
  category: 'cc' | 'pi' | 'pmh' | 'fh' | 'sh' | 'ros' | 'u',
  item: Array<ChartItem>,
};

class Category extends Component<Props> {
  title = {
    cc: 'Chief Complaint(주된 증상)',
    pi: 'Present Illness(증상에 대한 자세한 설명)',
    pmh: 'Past Medical Histroy(과거력)',
    fh: 'Family History(가족력)',
    sh: 'Social History(사회력)',
    ros: 'Review Of System(진단에 힌트가 될 내용)',
    u: 'Undefined(분류할 수 없음)',
  };

  render() {
    const { category, item } = this.props;
    return (
      <styled.CategoryWrapper>
        <styled.CategoryTitle>{this.title[category]}</styled.CategoryTitle>
        <styled.HrLarge />
        {item.map(info => (
          <Fragment key={`${info.index}${info.text}`}>
            <CategroyItem info={info} category={category} />
            <styled.HrSmall />
          </Fragment>
        ))}
      </styled.CategoryWrapper>
    );
  }
}

export default Category;
