import React from 'react';
import {
  object,
} from 'prop-types';
import {withStyles} from '@material-ui/core';
import {hot} from 'react-hot-loader';
import Title from 'Common/Title';
import ProblemTitle from 'Common/ProblemTitle';

const styles = (theme) => ({
});

/**
 * ProblemRoute Page
 */
@hot(module)
@withStyles(styles)
class ProblemRoute extends React.Component {
  static propTypes = {
    classes: object,
  };

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
        <Title title='线路问题' />
        <ProblemTitle
          title='nihao'
          component='sds'
        >
          你好
        </ProblemTitle>
      </div>
    );
  }
}

export default ProblemRoute;

