import {connect} from 'react-redux';

import Component from './component';
import {async, sync} from './actions';
const {
  fetchFilters,
  fetchProblemRoute,
} = async;

const {
  changeLimit,
  changePage,
  resetStore,
} = sync;

const mapStateToProps = (state, ownProps) => {
  return {
    columns: state.problemRoute.columns,
    limit: state.problemRoute.routes.limit,
    routes: state.problemRoute.routes.data,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeLimit: (param) => {
      dispatch(changeLimit(param));
    },
    onComponentDidMount: () => {
      dispatch(fetchFilters());
      dispatch(fetchProblemRoute());
    },
    onComponentWillUnmount: () => {
      dispatch(resetStore());
    },
    onPageChange: (param) => {
      dispatch(changePage(param));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
/**
 * Connected react component
 */
export default class Container extends Component {

}
