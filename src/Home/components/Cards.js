import React from 'react';
import {object} from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  SvgIcon,
  Typography,
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing.unit * 4 - 2,
  },
});

/**
 * 这里提供了一个卡片组件，目前会遍历生成出3个卡片
 */
@withStyles(styles)
class Cards extends React.PureComponent {
  static propTypes = {
    classes: object,
    questions: object,
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.cards = [
      {
        code: 'total',
        name: '问题总数',
      },
      {
        code: 'route',
        name: '问题站点',
      },
      {
        code: 'bus',
        name: '问题车辆',
      },
    ];
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      questions,
    } = this.props;

    return (
      <Grid
        container
        spacing={24}
        className={classes.root}
      >
        {
          this.cards.map((card, index) => (
            <Grid item xs key={card.code}>
              {card.name}
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

export default Cards;
