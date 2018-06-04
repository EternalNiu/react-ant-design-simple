import {connect} from 'react-redux';

import Component from './component';
import {

} from './actions';

const mapStateToProps = (state, ownProps) => {
  return {
    columns: [
      {
        id: 'routeName',
        label: '线路名称',
      },
      {
        id: 'routeNo',
        label: '线路号',
      },
      {
        id: 'startStop',
        label: '起点站',
      },
      {
        id: 'endStop',
        label: '终点站',
      },
      {
        id: 'company',
        label: '公司',
      },
      {
        id: 'problemType',
        label: '问题类型',
      },
      {
        id: 'detail',
        label: '详情',
      },
      {
        id: 'dispose',
        label: '处理状态',
      },
      {
        id: 'error',
        label: '误报',
        isNumeric: true,
      },
    ],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

@connect(mapStateToProps, mapDispatchToProps)
/**
 * Connected react component
 */
export default class Container extends Component {

}
