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
  control: {
    color: '#A5A4BF',
  },
  content1: {
    color: '#3B86FF',
  },
  content2: {
    color: '#A4A1FB',
  },
  content3: {
    color: '#FFC06A',
  },
  border1: {
    border: '1px solid #3B86FF',
  },
  border2: {
    border: '1px solid #A4A1FB',
  },
  border3: {
    border: '1px solid #FFC06A',
  },
  svgIcon: {
    width: 25,
    height: 25,
  },
  svgBorder: {
    height: 38,
    width: 38,
    marginTop: 16,
    marginLeft: 20,
    borderRadius: '50%',
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
        code: 'route',
        name: '线路',
        unit: '条',
        svg: '#icon-index_line',
        link: '/routes/newRouteInfo',
      },
      {
        code: 'stop',
        name: '站点',
        unit: '个',
        svg: '#icon-index_board',
        link: '/stops/new',
      },
      {
        code: 'bus',
        name: '车辆',
        unit: '辆',
        svg: '#icon-index_car',
        link: '/buses/new',
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
              <Card>
                <Grid
                  container
                  spacing={16}
                  justify='space-between'
                >
                  <Grid item xs container>
                      <Grid
                        className={classNames(classes.svgBorder, classes[`border${index+1}`])}
                        container
                        justify='center'
                        alignItems='center'
                      >
                        <SvgIcon
                          classes={{
                            root: classNames(classes.svgIcon, classes[`content${index+1}`]),
                          }}
                        >
                          <use xlinkHref={card.svg}></use>
                        </SvgIcon>
                      </Grid>
                      <CardContent>
                        <Typography
                          variant="title"
                          className={classes[`content${index+1}`]}
                        >
                          {`${questions[card.code]}${card.unit}`}
                        </Typography>
                        <Typography
                          variant="body2"
                        >
                          {card.name}
                        </Typography>
                      </CardContent>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={4}
                    justify='center'
                    alignItems='center'
                    spacing={40}
                    className={classes.control}
                  >
                    <Link to={card.link}>
                      <SvgIcon
                        classes={{
                          root: classes.svgIcon,
                        }}
                      >
                        <use xlinkHref='#icon-add'></use>
                      </SvgIcon>
                    </Link>
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
