import React from 'react';
import {
  array,
  string,
  shape,
  oneOfType,
  instanceOf,
  number,
  node,
  func,
  object,
} from 'prop-types';
import {Layout, Icon, Dropdown, Menu} from 'antd';
import {hot} from 'react-hot-loader';
import styles from './index.less';
const {Header, Content} = Layout;
import {withRouter} from 'react-router';

import NavList from '../NavList/NavList';
import HeaderSearch from '../HeaderSearch/HeaderSearch';

/**
 * AppFrame provides an AppBar on the top, a navigational sidebar on the left,
 * and an area for the page to display.
 * Sidebar can be toggled to be expanded or shrinked by clicking an icon on the
 * AppBar.
 * @param {*} [props.children] - Node that will be placed on the
 * main screen area
 * @param {Object[]} props.navs - Structured array of objects represents NavList.
 * See {@link NavList}
 * @param {function} [props.onLogout] - Callback fired when user clicks logout
 * button. See {@link AppBar}
 * @param {function} [props.onSearch] - Callback fired when user clicks enter
 * inside text field. See {@link AppBar}
 * @param {Object} [props.rootUrl] - App root url.
 * @param {(number|RegExp|string)} [props.rootUrl.matchPath] - RegExp that will
 * be matched against with current path.
 * @param {string} [props.rootUrl.path] - App root url.
 */
@hot(module)
@withRouter
class AppFrame extends React.Component {
  static propTypes = {
    className: string,
    children: node,
    history: object,
    navs: array,
    onLogout: func,
    onSearch: func,
    rootUrl: shape({
      matchPath: oneOfType([number, instanceOf(RegExp), string]),
      path: string,
    }),
    userName: string,
  };

  static defaultProps= {
    nav: [],
    className: '',
  }

  state = {
    collapsed: false,
  };

  /**
   * [toggle description]
   */
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  /**
   * LogoClick -点击logo展示首页
   * @param  {object} rootUrl - 默认页面
   */
  logoClick(rootUrl) {
    const {history} = this.props;
    history.push(rootUrl.path);
  }

  /**
   * 侧边栏点击路由调整
   * @param  {string} path - The jump route
   */
  navLinkClick(path) {
    const {history} = this.props;
    history.push(path);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      children,
      navs,
      rootUrl,
      onSearch,
      onLogout,
      className,
      userName,
    } = this.props;

    const {collapsed} = this.state;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <Menu.Item key="logout" onClick={onLogout}>
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout className={styles.layout}>
        <NavList navs={navs} rootUrl={rootUrl} collapsed={collapsed}/>
        <Layout>
          <Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
            <div className={styles.right}>
              <HeaderSearch
                className={`${styles.action} ${styles.search}`}
                placeholder="站内搜索"
                // dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                onPressEnter={onSearch.bind(this)}
              />
              <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <span className={styles.name}>{userName}</span>
                </span>
              </Dropdown>
            </div>
          </Header>
          <Content className={className}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppFrame;

