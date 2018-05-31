import React from 'react';
import {
  arrayOf,
  element,
  func,
  instanceOf,
  node,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import {hot} from 'react-hot-loader';

import {default as IBusUiAppFrame} from 'ibuscloud-ui/AppFrame';

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
      icon: element.isRequired,
      matchPath: oneOfType([number, instanceOf(RegExp), string]),
      path: string,
      text: string.isRequired,
    })),
    rootUrl: shape({
      matchPath: oneOfType([number, instanceOf(RegExp), string]),
      path: string,
    }),
  };


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
        rootUrl={rootUrl}
      >
        {children}
      </IBusUiAppFrame>
    );
  }
}

export default AppFrame;
