/* eslint-disable require-jsdoc */
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Component from './component';
import {async} from './actions';

const {
  logout,
} = async;

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: () => {
      dispatch(logout());
    },
    onSearch: (payload) => {
      dispatch(push(`/search/${payload.keyword}`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Container extends Component {

}

export default Container;
