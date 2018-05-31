import React from 'react';
import {
  object,
  number,
  func,
} from 'prop-types';
import {withStyles} from '@material-ui/core';
import {hot} from 'react-hot-loader';

const styles = (theme) => ({
  root: {
    color: 'orange',
  },
});

@hot(module)
@withStyles(styles)
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
    const {
      classes,
    } = this.props;

    return (
      <div>
        <div className={classes.root}>JSS demo</div>  
      </div>
    );
  }
}
