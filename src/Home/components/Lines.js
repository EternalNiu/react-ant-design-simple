import React from 'react';
import {object, array} from 'prop-types';
import {
  withStyles,
  Paper,
  Grid,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
// import {echarts} from 'react-echarts-binding/lib';

const styles = (theme) => ({
  root: {
    height: 380,
    padding: 20,
  },
  menu: {
    width: 200,
  },
  selectEmpty: {
    width: 130,
  },
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

    this.state = {
      age: 7,
    };

    this.data = {
      echarts1: {
        line1: [4, 4, 4, 4, 4],
        line2: [3, 3, 3, 3, 3],
      },
      echarts2: {
        line1: [
          {time: 1524420000, value: 4},
          {time: 1524423600, value: 4},
          {time: 1524425400, value: 4},
          {time: 1524426600, value: 4},
          {time: 1524430200, value: 4},
        ],
        line2: [
          {time: 1524420000, value: 3},
          {time: 1524423600, value: 3},
          {time: 1524425400, value: 3},
          {time: 1524426600, value: 3},
          {time: 1524430200, value: 3},
        ],
      },
    };

    this.options1 = {
      tooltip: {
        show: true,
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['line1', 'line2'],
      },
      xAxis: {
        type: 'category',
        name: '时间',
        data: [1, 2, 3, 4, 5],
      },
      yAxis: [{
        name: '数值',
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#E5E9EE',
          },
        },
        axisLabel: {
          color: '#8C949C',
        },
      }],
      series: [{
        name: 'line1',
        type: 'line',
        smooth: true,
        data: this.data.echarts1.line1,
      }, {
        name: 'line2',
        type: 'line',
        smooth: true,
        data: this.data.echarts1.line2,
      }],
    };
  }

  /**
   * handleChange
   * @param  {[type]} event [description]
   */
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant='title'>
              问题走势
            </Typography>
          </Grid>
          <Grid item xs={6} container justify='flex-end'>
            <Select
              value={this.state.age}
              onChange={this.handleChange.bind(this)}
              displayEmpty
              name="age"
              className={classes.selectEmpty}
            >
              <MenuItem value={7}>最近7天</MenuItem>
              <MenuItem value={14}>最近14天</MenuItem>
              <MenuItem value={30}>最近30天</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <div style={{width: '50%', height: '100%'}}>
          
        </div>
      </Paper>
    );
  }
}

export default Lines;
