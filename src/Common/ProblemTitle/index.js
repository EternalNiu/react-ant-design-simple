import React from 'react';
import {
  object,
  string,
  node,
} from 'prop-types';
import {
  Card,
  Grid,
  Chip,
  Typography,
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    marginBottom: 20,
  },
  title: {
    padding: '17px 20px 17px 24px',
  },
});

/**
 * 纯信息展示面板包含统一的样式，标题和详情内容
 * @param {string} [title=''] - 面板标题
 * @param {Node} [children] - 详情内容
 */
@withStyles(styles)
class ProblemTitle extends React.Component {
  static propTypes = {
    classes: object,
    title: string,
    children: node,
    component: node,
  };

  static defaultProps = {
    title: 'nihao',
  };
  /**
   * [handleDelete description]
   */
  handleDelete() {
    console.log(2);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      title,
      children,
      component,
    } = this.props;

    return (
      <Card>
        <Grid
          container
          justify='space-between'
          className={classes.title}
        >
          <Grid xs={8} item container alignItems='flex-start'>
            <Typography variant='body1'>
              标题
            </Typography>
            <div>chips</div>
          </Grid>
          <Grid>icon</Grid>
        </Grid>
        <div>
          {children}
        </div>
      </Card>
    );
  }
}

export default ProblemTitle;
