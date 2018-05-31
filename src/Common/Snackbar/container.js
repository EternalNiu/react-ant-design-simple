/* eslint-disable require-jsdoc */
import {connect} from 'react-redux';

import Component from './component';
import {sync} from './actions';

const {
  close,
} = sync;

const mapStateToProps = (state, ownProps) => {
  return {
    action: state.snackbar.action,
    isOpen: state.snackbar.isOpen,
    message: state.snackbar.message,
    timeout: 3000,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClose: () => {
      dispatch(close());
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Container extends Component {
}

export default Container;
