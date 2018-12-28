/**
 * pageName: {{pageNameUpper}}
 * chineseName: {{pageNavChineseName}}
 * parentModule: {{moduleName}}
 * author: {{author}}
 * date: {{date}}
 */
import React from 'react';

import {
  Layout,
} from 'antd';

import { BrowserRouter, Route, Link } from 'react-router-dom';

import commonConf from 'config/main.conf';
import RuleManage from 'containers/RuleManage/Loadable';
import Lottery from 'containers/Lottery';
import './index.less';

class Main extends React.Component {

  componentWillMount() {
    this.init();
  }

  init = () => {
    const { DBInfo } = commonConf;
    if (window.indexedDB) {
      const request = window.indexedDB.open(DBInfo.DBName, DBInfo.version);
      request.onsuccess = (event) => {
        window.db = event.target.result;
      };

      request.onupgradeneeded = (event) => {
        window.db = event.target.result;
        let objectStore;
        if (!window.db.objectStoreNames.contains('award')) {
          objectStore = window.db.createObjectStore('award', { autoIncrement: true });
          objectStore.createIndex('award_name', 'award_name', { unique: true });
          objectStore.createIndex('award_content', 'award_content', { unique: false });
          objectStore.createIndex('award_num', 'award_num', { unique: false });
          objectStore.createIndex('single_num', 'single_num', { unique: false });
          objectStore.createIndex('sex', 'sex', { unique: false });
        }
        if (!window.db.objectStoreNames.contains('user')) {
          objectStore = window.db.createObjectStore('user', { keyPath: 'id' });
          objectStore.createIndex('name', 'name', { unique: false });
          objectStore.createIndex('sex', 'sex', { unique: false });
        }
      };

      request.onerror = (event) => {
        console.log(`打开失败,错误号：${event.target.errorCode}`);
        console.log('event.target: ', event.target);
      };
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="lottery-container">
          <Link to="ruleManage"> 规则设置</Link>
          <Link to="lottery"> 去抽奖</Link>
          <Route path="/ruleManage" component={RuleManage} />
          <Route path="/lottery" component={Lottery} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
