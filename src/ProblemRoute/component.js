import React from 'react';
import {
  array,
  func,
  number,
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

});

/**
 * ProblemRoute Page
 */
@hot(module)
@withStyles(styles)
class ProblemRoute extends React.Component {
  static propTypes = {
    changeLimit: func.isRequired,
    classes: object,
    columns: array.isRequired,
    limit: number.isRequired,
    onComponentDidMount: func.isRequired,
    onComponentWillUnmount: func.isRequired,
    onPageChange: func.isRequired,
    routes: array.isRequired,
  };

   /**
   * componentDidMount
   */
  componentDidMount() {
    const {onComponentDidMount} = this.props;
    typeof onComponentDidMount === 'function' && onComponentDidMount();
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    const {onComponentWillUnmount} = this.props;
    typeof onComponentWillUnmount === 'function' && onComponentWillUnmount();
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

  }

  /**
   * [handlePageChange description]
   * @param  {object} event
   * @param  {number} page  - 当前页数
   */
  handlePageChange(event, page) {
    const {
      onPageChange,
    } = this.props;

    onPageChange({
      page: page + 1, // Table组件的page从0开始
    });
  }

  /**
   * [handleRowsPerPageChange description]
   * @param {object} event
   */
  handleRowsPerPageChange(event) {
    this.props.changeLimit(event.target.value);
  }

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    const {
      classes,
      columns,
      limit,
      routes,
    } = this.props;

    const tabTitle = columns.filter((column) => {
      return column.isCheck === true;
    });

    const data = routes.map((route) => {
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
            checked={false}
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
        >
          <Table
            columns={tabTitle}
            defaultRowsPerPage={10}
            isPaginable={true}
            onChangePage={this.handlePageChange.bind(this)}
            onChangeRowsPerPage={this.handleRowsPerPageChange.bind(this)}
            rows={data}
            total={1000}
          />
        </ProblemTitle>
      </div>
    );
  }
}

export default ProblemRoute;

