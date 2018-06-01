import React from 'react';
import {
  object,
  func,
  array,
  number,
} from 'prop-types';
import {Grid, withStyles} from '@material-ui/core';
import {hot} from 'react-hot-loader';

import Cards from './components/Cards';

const styles = (theme) => ({
  root: {
    overflow: 'hidden',
  },
});

/**
 * 项目主页面，负责基本布局同时引入各个组件进行展示
 * Home Page
 */
@hot(module)
@withStyles(styles)
class Home extends React.Component {
  static propTypes = {
    classes: object,
    questions: object,
    componentDidMount: func,
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
  }

  /**
   * ComponentDidMount
   */
  componentDidMount() {
    this.props.componentDidMount();
  }
  /**
   * Render Home Page
   * @return {Component}
   */
  render() {
    const {
      classes,
      questions,
    } = this.props;

    return (
      <div className={classes.root}>
        <Cards questions={questions} />
        <Grid container spacing={24}>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>

          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;

