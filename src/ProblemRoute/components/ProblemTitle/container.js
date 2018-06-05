/* eslint-disable require-jsdoc */
import {connect} from 'react-redux';
import {sync} from '../../actions';

import Component from './component';

const {
  changeChips,
  removeCondition,
} = sync;

const mapStateToProps = (state, ownProps) => {
  return {
    conditions: state.problemRoute.conditions,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeCondition: (param) => {
      dispatch(removeCondition(param));
    },
    changeFilter: (param) => {
      dispatch(changeChips(param));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Container extends Component {
}

export default Container;
