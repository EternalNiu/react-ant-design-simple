import React from 'react';
import {hot} from 'react-hot-loader';
import {withRouter} from 'react-router';
import Router from './router';

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
class Container extends App {
}

export default Container;
