import React from 'react';
import {
  arrayOf,
  func,
  instanceOf,
  node,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import {hot} from 'react-hot-loader';

import {default as IBusUiAppFrame} from '../Common/AppFrame';
import styles from './index.less';

/**
 * Provides an AppBar and a navigational Drawer
 * @param {function} onLogout - Logout callback.
 * Signature:
 * () => void
 * @param {function} onSearch - Keyword search callback.
 * Signature:
 * ({keyword: string}) => void
 * keyword: Search keyword.
 */
@hot(module)
class AppFrame extends React.Component {
  static propTypes = {
    children: node,
    navs: arrayOf(shape({
      icon: string,
      matchPath: oneOfType([number, instanceOf(RegExp), string]),
      path: string,
      text: string.isRequired,
    })),
    onLogout: func.isRequired,
    onSearch: func.isRequired,
    rootUrl: shape({
      matchPath: oneOfType([number, instanceOf(RegExp), string]),
      path: string,
    }),
  };

  /**
   * Logout
   */
  handleLogout() {
    const {
      onLogout,
    } = this.props;

    onLogout();
  }

  /**
   * Redirect to search page
   * @param {string} keyword - Search keyword
   */
  handleSearch(keyword) {
    const {
      onSearch,
    } = this.props;

    onSearch({keyword});
  }

  /**
   * Render a form sending post data
   * @return {Component}
   */
  render() {
    const {
      children,
      navs,
      rootUrl,
    } = this.props;

    return (
      <IBusUiAppFrame
        navs={navs}
        onLogout={this.handleLogout.bind(this)}
        onSearch={this.handleSearch.bind(this)}
        rootUrl={rootUrl}
        className={styles.content}
        userName='公交云超级管理员'
      >
        {children}
      </IBusUiAppFrame>
    );
  }
}

export default AppFrame;
