import React from 'react';
import {
  object,
  number,
  func,
} from 'prop-types';
import {DatePicker} from 'antd';
import {hot} from 'react-hot-loader';

@hot(module)
/**
 * List Page
 */
export default class List extends React.Component {
  static propTypes = {
    classes: object,
    count: number,
    fetchSomeAsyncRequest: func,
  };

  /**
   * Call saga function to increment count by 1
   */
  onClick() {
    this.props.fetchSomeAsyncRequest();
  }

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    return (
      <div>
        <div >JSS demokjhjkghjgjkdhjkasfhkajsfhsdakfjsdjhkfsafsadf</div>
        <DatePicker />
      </div>
    );
  }
}
