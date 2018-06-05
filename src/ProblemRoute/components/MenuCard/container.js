/* eslint-disable require-jsdoc */
import {connect} from 'react-redux';
import {sync} from '../../actions';

import Component from './component';

const {
  changeTabTitle,
} = sync;

const mapStateToProps = (state, ownProps) => {
  return {
    columns: state.problemRoute.columns,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTabTitle: (param) => {
      dispatch(changeTabTitle(param));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Container extends Component {
}

export default Container;
