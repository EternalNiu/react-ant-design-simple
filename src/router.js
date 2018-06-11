import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {object} from 'prop-types';
import lodable from 'react-loadable';
import AppLayout from './AppLayout/container';

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

    this.EditRoute = lodable({
      loader: () => {
        injectAsyncReducer( // Aynchronously load reducer
          context.store,
          'editRoute', // Reducer name
          require('./EditRoute/reducer').default // Reducer function
        );

        return import('./EditRoute/container');
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
      <AppLayout
        navs={[{
          icon: 'pie-chart',
          matchPath: /^\/editRoute$/,
          path: '/editRoute',
          text: '线路管理',
        }, {
          icon: 'fork',
          matchPath: /^\/stops$/,
          path: '/stops',
          text: '站点管理',
        }, {
          icon: 'car',
          matchPath: /^\/buses$/,
          path: '/buses',
          text: '车辆管理',
        }, {
          icon: 'wifi',
          matchPath: /^\/infoManage$/,
          path: '/infoManage',
          text: '信息管理',
        }, {
          icon: 'tool',
          matchPath: /^\/drafts$/,
          path: '/drafts',
          text: '变更申请',
        }, {
          icon: 'flag',
          matchPath: /^\/verifications$/,
          path: '/verifications',
          text: '变更审核',
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
          <Route exact path="/list" component={this.List} />
          <Route exact path="/editRoute" component={this.EditRoute} />
        </Switch>
      </AppLayout>
    );
  }
}
