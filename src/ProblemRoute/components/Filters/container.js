/* eslint-disable require-jsdoc */
import {connect} from 'react-redux';
import {sync} from '../../actions';

import Component from './component';

const {
  addCondition,
  changeFilter,
  removeCondition,
} = sync;

const mapStateToProps = (state, ownProps) => {
  return {
    filters: state.problemRoute.filters.data,
    conditions: state.problemRoute.conditions,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onConditionAdd: (param) => {
      dispatch(addCondition(param));
    },
    onConditionRemove: (param) => {
      dispatch(removeCondition(param));
    },
    changeFilter: (param) => {
      dispatch(changeFilter(param));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Container extends Component {
}

export default Container;
