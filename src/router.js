import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {object} from 'prop-types';
import lodable from 'react-loadable';


// Dynamically load reducer
import injectAsyncReducer from './injectAsyncReducer';

/**
 * Router with lazy loaded pages
 */
export default class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  /**
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props, context) {
    super(props);

    this.List = lodable({
      loader: () => {
        injectAsyncReducer( // Aynchronously load reducer
          context.store,
          'list', // Reducer name
          require('./List/reducer').default // Reducer function
        );

        return import('./List/container');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });

    this.AppLayout = lodable({
      loader: () => {
        injectAsyncReducer( // Aynchronously load reducer
          context.store,
          'appLayout', // Reducer name
          require('./AppLayout/reducer').default // Reducer function
        );

        return import('./AppLayout/container');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Redirect to='/appLayout' />
        )} />
        <Route exact path="/appLayout" component={this.AppLayout} />
        <Route exact path="/list" component={this.List} />
      </Switch>
    );
  }
}
