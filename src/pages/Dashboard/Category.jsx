// @flow
import React, { Component, Fragment } from 'react';
import * as styled from './Styled';
// component
import CategroyItem from './CategoryItem';
// type
import type { ChartItem } from '../../modules/chart';

type Props = {
  category: 'cc' | 'pi' | 'pmh' | 'fh' | 'sh' | 'ros',
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
  };

  render() {
    const { category, item } = this.props;
    return (
      <styled.CategoryWrapper>
        <styled.CategoryTitle>{this.title[category]}</styled.CategoryTitle>
        <styled.HrLarge />
        {item.map(info => (
          <Fragment key={info.text}>
            <CategroyItem info={info} />
            <styled.HrSmall />
          </Fragment>
        ))}
      </styled.CategoryWrapper>
    );
  }
}

export default Category;
