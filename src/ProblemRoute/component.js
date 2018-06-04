import React from 'react';
import {
  array,
  object,
} from 'prop-types';
import {
  IconButton,
  SvgIcon,
  Switch,
  withStyles,
} from '@material-ui/core';
import {hot} from 'react-hot-loader';
import Table from 'ibuscloud-ui/Table';
import Title from 'Common/Title';
import ProblemTitle from './components/ProblemTitle/index';

const styles = (theme) => ({
  columns: {
    background: '#fff',
  },
});

/**
 * ProblemRoute Page
 */
@hot(module)
@withStyles(styles)
class ProblemRoute extends React.Component {
  static propTypes = {
    classes: object,
    columns: array.isRequired,
  };

  /**
   * [constructor description]
   * @param  {[type]} props [description]
   */
  constructor(props) {
    super(props);

    this.data = [{
      id: 120021,
      routeName: '1路',
      routeNo: '10001',
      startStop: '凤起路',
      endStop: '滨河路',
      company: '公交云',
      problemType: '没有直达线路',
      detail: '能不能加一班公交',
      dispose: '处理状态',
      error: '错误',
    }];

    this.state = {
      checked: false,
    };
  }

  /**
   * 处理状态按钮点击状态改变
   */
  handleChange() {
    this.setState({
      checked: !this.state.checked,
    });
  }

  /**
   * [resetClick description]
   * @param  {[type]} routeId [description]
   */
  resetClick(routeId) {
    console.log(routeId);
  }

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    const {
      classes,
      columns,
    } = this.props;

    const {checked} = this.state;

    const data = this.data.map((route) => {
      return {
        ...route,
        routeName: route.routeName,
        routeNo: route.routeNo,
        startStop: route.startStop,
        endStop: route.endStop,
        company: route.company,
        problemType: route.problemType,
        detail: route.detail,
        dispose: (
          <Switch
            checked={checked}
            onChange={this.handleChange.bind(this)}
            value="checked"
            color="primary"
          />
        ),
        error: (
          <IconButton>
            <SvgIcon
              onClick={this.resetClick.bind(this, route.id)}
            >
              <use href='#icon-icon_close'></use>
            </SvgIcon>
          </IconButton>
        ),
      };
    });

    return (
      <div>
        <Title title='线路问题' />
        <ProblemTitle
          title='nihao'
          component='sds'
        >
          <Table
            defaultRowsPerPage={0}
            columns={columns}
            rows={data}
            classes={{
              tableCellRoot: classes.columns,
            }}
          />
        </ProblemTitle>
      </div>
    );
  }
}

export default ProblemRoute;

