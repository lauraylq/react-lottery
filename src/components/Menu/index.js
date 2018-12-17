import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'antd';
import menuNesting from './helper';

export default class SofaMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: props.openKeys,
      selectedKeys: props.selectedKeys,
    };
  }

  static propTypes = {
    selectedKeys: PropTypes.array,
    openKeys: PropTypes.array,
    authList: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    changeLocation: PropTypes.func.isRequired,
  }

  handleClick = ({ keyPath }) => {
    const { changeLocation } = this.props;
    const path = [...keyPath];
    path.reverse();
    const pathname = `/${path.join('/')}`;
    changeLocation(pathname);

    const { openKeys, selectedKeys } = SofaMenu.pathKeys(pathname);
    this.setState({
      openKeys,
      selectedKeys,
    });
  }

  static pathKeys = (pathname) => {
    if (pathname) {
      const pathArray = pathname.split('/').filter(Boolean);
      if (pathname === '/' || pathArray.length < 2) {
        return {
          openKeys: [],
          selectedKeys: pathArray.length ? pathArray : ['homePage'],
        };
      }
      return {
        openKeys: pathArray.slice(0, pathArray.length - 1),
        selectedKeys: pathArray.slice(-1),
      };
    }
    return {
      openKeys: [],
      selectedKeys: ['homePage'],
    };
  }

  render() {
    const {
      authList,
      data,
    } = this.props;

    const {
      selectedKeys,
      openKeys,
    } = this.state;

    return (
      <Menu
        selectedKeys={selectedKeys}
        className="ant-menu"
        onClick={this.handleClick}
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode="inline"
      >
        { menuNesting(data, authList) }
      </Menu>
    );
  }
}
