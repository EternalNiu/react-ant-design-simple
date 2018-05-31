import React from 'react';
import {
  object,
  node,
  string,
} from 'prop-types';
import {Grid, Typography, withStyles} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    marginBottom: 30,
  },
});

/**
 * 这里提供了一个公共的Title组件 下边距固定为30px
 * @param {string} [title=''] - 标题
 * @param {Node} [component] - 內容固定在右部
 */
@withStyles(styles)
class Title extends React.Component {
  static propTypes = {
    classes: object,
    title: string,
    component: node,
  };

  static defaultProps = {
    title: '',
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      title,
      component,
    } = this.props;

    return (
      <div>
        {
          component ?
            (
              <Grid
                container
                justify='space-between'
                alignItems='flex-end'
                className={classes.root}
              >
                <Grid item>
                  <Typography variant='headline'>
                    {title}
                  </Typography>
                </Grid>
                <Grid item>
                  {component}
                </Grid>
              </Grid>
            )
          :
            (
              <Typography variant='headline' className={classes.root}>
                {title}
              </Typography>
            )
        }
      </div>
    );
  }
}

export default Title;
