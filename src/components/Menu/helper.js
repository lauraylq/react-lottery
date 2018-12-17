import React from 'react';
import { Menu, Icon } from 'antd';

import { checkAuth } from 'containers/AuthControl';

const { Item, SubMenu } = Menu;

function menuNesting(menuConfig, authList) {
  const items = menuConfig.map((item) => {
    if (item.children && item.visibilityChild !== 'hidden') {
      const childrenNodes = menuNesting(item.children, authList);
      if (childrenNodes.filter(node => node).length) { // 若子节点为空，那么父节点不应该显示
        return (
          checkAuth(item.auth, authList)(
            <SubMenu
              key={item.key}
              title={(
                <span>
                  { item.icon ? <Icon type={item.icon} /> : '' }
                  <span>{item.text}</span>
                </span>)}
            >
              {childrenNodes}
            </SubMenu>,
          )
        );
      }
      return '';
    }
    return (
      checkAuth(item.auth, authList)(
        <Item key={item.key}>
          { item.icon ? <Icon type={item.icon} /> : '' }
          <span>{item.text}</span>
        </Item>,
      )
    );
  });
  return items;
}

export default menuNesting;
