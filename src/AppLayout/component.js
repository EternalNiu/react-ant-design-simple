import React from 'react';
import {
  arrayOf,
  string,
  shape,
  oneOfType,
  instanceOf,
  number,
  node,
  object,
} from 'prop-types';
import {Layout, Menu, Icon} from 'antd';
import {hot} from 'react-hot-loader';
import './niu.less';
const {Header, Sider, Content} = Layout;
import {createBrowserHistory as createHistory} from 'history';
const history = createHistory();
/**
 * AppLayout 项目布局页面
 */
@hot(module)
class AppLayout extends React.Component {
  static propTypes = {
    children: node,
    classes: object,
    history: object,
    navs: arrayOf(shape({
      icon: string,
      matchPath: oneOfType([number, instanceOf(RegExp), string]).isRequired,
      path: string.isRequired,
      text: string.isRequired,
    })),
    rootUrl: shape({
      matchPath: oneOfType([number, instanceOf(RegExp), string]),
      path: string,
    }),
  };

  static defaultProps= {
    nav: [],
  }

  /**
   * [constructor description]
   * @param  {[type]} props [description]
   */
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

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
    history.push(rootUrl.path);
  }

  /**
   * 侧边栏点击路由调整
   * @param  {string} path - The jump route
   */
  navLinkClick(path) {
    history.push(path);
  }

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    const {
      children,
      navs,
      rootUrl,
    } = this.props;

    return (
      <Layout className='layout'>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className='logo' onClick={this.logoClick.bind(this, rootUrl)}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {
              navs.map((navLink, index) => (
                <Menu.Item
                  key={index}
                  onClick={this.navLinkClick.bind(this, navLink.path)}
                  >
                  <Icon type={navLink.icon} />
                  <span>{navLink.text}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          <Header className='header'>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
          </Header>
          <Content className='content'>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;

