import React from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Router from './router';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

/**
 * App
 */
@hot(module)
class App extends React.Component {
  /**
   * @return {Element}
   */
  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

/**
 * App
 */
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Container extends App {
}

export default Container;
