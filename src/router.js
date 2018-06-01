import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {object} from 'prop-types';
import lodable from 'react-loadable';

import AppFrame from './AppFrame/container';

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

    this.HomePage = lodable({
      loader: () => {
        injectAsyncReducer( // Aynchronously load reducer
          context.store,
          'home', // Reducer name
          require('./Home/reducer').default // Reducer function
        );

        return import('./Home/container');
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
      <AppFrame
        navs={[{
          icon: <use href="#icon-icon_line"></use>,
          matchPath: /(^\/list$)|(^\/$)/,
          path: '/list',
          text: '线路管理',
        }]}
        rootUrl={{
          matchPath: /(^\/home$)|(^\/$)/,
          path: '/home',
        }}
      >
        <Switch>
          <Route exact path='/' render={() => (
            <Redirect to='/list' />
          )} />
          <Route exact path="/home" component={this.HomePage} />
        </Switch>
      </AppFrame>
    );
  }
}
