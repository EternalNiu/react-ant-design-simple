import React from 'react';
import {object, array} from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
});

/**
 * 这里提供了一个卡片组件，目前会遍历生成出3个卡片
 */
@withStyles(styles)
class Lines extends React.PureComponent {
  static propTypes = {
    classes: object,
    lines: array,
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      lines,
    } = this.props;

    return (
      <div>
        lines
      </div>
    );
  }
}

export default Lines;
