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
class Pies extends React.PureComponent {
  static propTypes = {
    classes: object,
    pies: array,
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
      pies,
    } = this.props;

    return (
      <div>
        pies
      </div>
    );
  }
}

export default Pies;
