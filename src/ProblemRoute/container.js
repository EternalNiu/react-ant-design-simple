import {connect} from 'react-redux';

import Component from './component';
import {async, sync} from './actions';
const {
  fetchProblemRoute,
} = async;

const mapStateToProps = (state, ownProps) => {
  return {
    columns: state.problemRoute.columns,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentDidMount: () => {
      dispatch(fetchProblemRoute());
    },
    onComponentWillUnmount: () => {

    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
/**
 * Connected react component
 */
export default class Container extends Component {

}
