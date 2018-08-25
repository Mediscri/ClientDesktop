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
    cc: 'Chief Complaint',
    pi: 'Present Illness',
    pmh: 'Past Medical Histroy',
    fh: 'Family History',
    sh: 'Social History',
    ros: 'Review Of System',
    u: 'Undefined',
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
