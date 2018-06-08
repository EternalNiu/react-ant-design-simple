import React from 'react';
import {
  object,
} from 'prop-types';
import {Layout, Menu, Table, Icon, Divider} from 'antd';
import {hot} from 'react-hot-loader';
import './niu.less';
const {Header, Sider, Content} = Layout;
/**
 * AppLayout 项目布局页面
 */
@hot(module)
class AppLayout extends React.Component {
  static propTypes = {
    classes: object,
  };

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
   * Render List Page
   * @return {Component}
   */
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Divider type="vertical" />
          <a href="javascript:;" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];

    return (
      <Layout className="niu" style={{height: '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div style={{height: 32, background: 'rgba(255,255,255,.2)', margin: 16}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
            <Icon
              style={{fontSize: 18, padding: '0 24px', cursor: 'pointer'}}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
          </Header>
          <Content className='content' style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
            <Table columns={columns} dataSource={data} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;

