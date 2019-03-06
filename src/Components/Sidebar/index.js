import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './index.css';

const Sidebar = (props) => (
    <section className="sidebar">
      <Menu
        style={{ marginTop: '146px', border: 'none'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1">{<Link to="/app"><span><Icon type="home" /><span>Home</span></span></Link>}</Menu.Item>
        <Menu.Item key="2">{<Link to="/app/settings"><span><Icon type="setting" /><span>Settings</span></span></Link>}</Menu.Item>
        <Menu.Item key="3">{<Link to="/app/logout"><span><Icon type="logout" /><span>Logout</span></span></Link>}</Menu.Item>
      </Menu>
    </section>
);

export default Sidebar;