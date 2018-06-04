import React from 'react';
import {object} from 'prop-types';
import {
  Card,
  CardMedia,
  Grid,
  SvgIcon,
  Typography,
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';

import './iconfont';
import bg1 from './img/bg1.png';
import bg2 from './img/bg2.png';
import bg3 from './img/bg3.png';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing.unit * 4 - 2,
  },
  card: {
    padding: 20,
    height: 133,
  },
  svgIcon: {
    width: 15,
    height: 11,
  },
  percent: {
    fontSize: 12,
    color: '#3CC480',
  },
  percentDown: {
    color: '#FF4141',
  },
  count: {
    marginTop: 20,
    marginBottom: -10,
  },
  cover: {
    width: 112,
    height: 40,
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
        spacing={40}
        className={classes.root}
      >
        {
          this.cards.map((card, index) => (
            <Grid item xs key={card.code}>
              <Card className={classes.card}>
                <Grid
                  container
                  spacing={16}
                >
                  <Grid
                    xs={6}
                    item
                    container
                    direction='column'
                    wrap='nowrap'
                    spacing={8}
                  >
                    <Grid item>
                      <Typography variant='body1'>{card.name}</Typography>
                    </Grid>
                    <Grid item className={classes.count}>
                      <Typography variant='headline'>
                        {questions[card.code] && questions[card.code].count}
                      </Typography>
                    </Grid>
                    <Grid item container wrap='nowrap' alignItems='center'>
                      <Grid item>
                        <SvgIcon
                          classes={{
                            root: classes.svgIcon,
                          }}
                        >
                          <use
                            xlinkHref={
                              questions[card.code] &&
                              questions[card.code].float === 'down' ?
                              `#icon-DownArrow` :
                              `#icon-UpArrow`
                            }
                          >
                          </use>
                        </SvgIcon>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        className={classNames(classes.percent, {
                        [classes.percentDown]: questions[card.code] &&
                        questions[card.code].float === 'down',
                      })}>
                        {questions[card.code] && questions[card.code].percent}
                      </Grid>
                    </Grid>
                    </Grid>
                  <Grid
                    xs={6}
                    item
                    container
                    justify='flex-end'
                    alignItems='flex-end'
                  >
                    {
                      index === 0 &&
                      <CardMedia
                       className={classes.cover}
                       image={bg1}
                      />
                    }
                    {
                      index === 1 &&
                      <CardMedia
                       className={classes.cover}
                       image={bg2}
                      />
                    }
                    {
                      index === 2 &&
                      <CardMedia
                       className={classes.cover}
                       image={bg3}
                      />
                    }
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

export default Cards;
