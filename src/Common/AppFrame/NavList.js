import React from 'react';
import {
  arrayOf,
  string,
  shape,
  array,
  object,
} from 'prop-types';
import {Menu, Icon, Sider} from 'antd';
import {hot} from 'react-hot-loader';
import {withRouter} from 'react-router';

import doesPathMatch from '../Util/doesPathMatch';

/**
 * NavList tests router path against current location to highlight NavLink.
 * Click on NavLink will redirect to the corresponding address.
 * @param {Object[]} [props.navs=[]] - Structured array of objects
 * represents NavList
 * @param {string} props.navs[].icon - Icon type
 * @param {(number|RegExp|string)} props.navs[].matchPath - RegExp that will be
 * matched against current path.
 * Match against current location.path to highlight NavLink.
 * @param {string} props.navs[].path - NavList redirect to address.
 * @param {string} props.navs[].text - NavList text content.
 * @param {array} [props.navs[].navs - Structured array of objects
 */
@hot(module)
@withRouter
class NavList extends React.PureComponent {
  static propTypes = {
    location: object,
    history: object,
    navs: arrayOf(shape({
      icon: string,
      path: string,
      text: string.isRequired,
      navs: array,
    })),
  };

  static defaultProps= {
    nav: [],
  }

  /**
   * Redirect to page specified by nav.path.
   * @param {string} path - Path to redirect to.
   * @param {boolean} preventRedirect - Will not redirect if value is true.
   */
  handleClick(path, preventRedirect) {
    const {
      history,
    } = this.props;

    // Redirect only if currnt path does not match matchPath
    if (preventRedirect) return;

    history.push(path);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      navs,
      location,
      rootUrl,
    } = this.props;

    let defaultOpenKeys = [];

    let defaultSelectedKeys = [];

    const findOpenKeys = (navs, paths, path) => {
      if (paths.length === 0) {
        return;
      }

      const pathName = `${path}${paths[0]}`;
      const nav = navs.find((item)=>(item.path === pathName));
      if (!nav) {
        return;
      }
      const text = nav && nav.text;

      defaultOpenKeys.push(`sub${text}`);

      findOpenKeys(nav.navs, paths.splice(1, paths.length), `${pathName}/`);
    };

    const navsMap = (navs) => (
      navs.map((nav) => {
        const isOnCurrentPage = doesPathMatch(nav.matchPath, location.pathname);

        if (isOnCurrentPage) {
          defaultSelectedKeys.push(nav.text);
          const paths = location.pathname.split('/');
          const openPaths = paths.splice(1, paths.length-1);
          findOpenKeys(this.props.navs, openPaths, '/');
        }

        return (
          nav.navs ?
          <Menu.SubMenu
            key={`sub${nav.text}`}
            title={
              <span>
                {
                  nav.icon &&
                  <Icon type={nav.icon} />
                }
              <span>{nav.text}</span>
              </span>
            }
          >
            {
              navsMap(nav.navs)
            }
          </Menu.SubMenu>
          :
          <Menu.Item
            key={nav.text}
            onClick={this.handleClick.bind(this, nav.path, isOnCurrentPage)}
          >
            {
              nav.icon &&
              <Icon type={nav.icon} />
            }
            <span>{nav.text}</span>
          </Menu.Item>
        );
      })
    );

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div
        >
          <Icon type={rootUrl.icon}/>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
        >
          {
            navsMap(navs)
          }
        </Menu>
      </Sider>
    );
  }
}

export default NavList;

