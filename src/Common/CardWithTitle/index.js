import React from 'react';
import {
  object,
  string,
  node,
} from 'prop-types';
import {
  Card,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    marginBottom: 20,
  },
  title: {
    padding: '20px 20px 34px 20px',
  },
  container: {
    margin: '0 auto 60px',
  },
});

/**
 * 纯信息展示面板包含统一的样式，标题和详情内容
 * @param {string} [title=''] - 面板标题
 * @param {Node} [children] - 详情内容
 */
@withStyles(styles)
class CardWithTitle extends React.Component {
  static propTypes = {
    classes: object,
    title: string,
    children: node,
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
      children,
      component,
    } = this.props;

    return (
      <Card className={classes.title}>
        {
          component ?
          (
              <Grid
                container
                justify='space-between'
                alignItems='flex-end'
                // className={classes.title}
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
              <Typography variant='headline'>
                {title}
              </Typography>
            )
        }
        <div className={classes.container}>
          {children}
        </div>
      </Card>
    );
  }
}

export default CardWithTitle;
