/**
 * pageName: {{pageNameUpper}}
 * chineseName: {{pageNavChineseName}}
 * parentModule: {{moduleName}}
 * author: {{author}}
 * date: {{date}}
 */
import React from 'react';
import PropTypes from 'prop-types';

import { HashRouter, Route, Link } from 'react-router-dom';

import commonConf from 'config/main.conf';
import RuleManage from 'containers/RuleManage/Loadable';
import ResultManage from 'containers/ResultManage/Loadable';
import Lottery from 'containers/Lottery';
import { getData } from 'utils/store';
import { Drawer, Button } from 'antd';
import './index.less';


import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import { updateUserData } from '../../state/actions';

const withConnect = connectFactory('lottery');
@withConnect(
  // 可以使用者两种方式mapstatetoprops 但是推荐使用select的方式，经测会减少渲染次数，性能较好；
  // (globalState, state) => ({
  //   tableData: state.get('tableData').toJS(),
  //   pagination: state.get('pagination').toJS(),
  //   searchCondition: state.get('searchCondition').toJS(),
  //   loading: globalState.getIn(['global', 'loading']),
  // }),
  createStructuredSelector({
  }),
  { // 其实这里可以处理掉，当前每引入一个action,需要更新props绑定，更新PropsType，
    // 实际可以直接将action全量引入，但是出于对性能及规范开发的要求，这里仍然使用单独引入的方式；
    updateUserData,
  },
)
class Main extends React.Component {
  componentWillMount() {
    this.init();
  }

  static propTypes = {
    updateUserData: PropTypes.func.isRequired,
  };

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  init = () => {
    const { DBInfo } = commonConf;
    if (window.indexedDB) {
      const request = window.indexedDB.open(DBInfo.DBName, DBInfo.version);
      request.onsuccess = (event) => {
        window.db = event.target.result;
        getData(DBInfo.storeName.user).then((res) => {
          this.props.updateUserData(res);
        });
      };

      request.onupgradeneeded = (event) => {
        window.db = event.target.result;
        getData(DBInfo.storeName.user).then((res) => {
          this.props.updateUserData(res);
        });
        let objectStore;
        if (!window.db.objectStoreNames.contains('award')) {
          objectStore = window.db.createObjectStore('award', { keyPath: 'id', autoIncrement: true });
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
      <HashRouter>
        <div className="lottery-container">
          <Button type="primary" onClick={this.showDrawer}>
          </Button>
          <Drawer
            title="SFTC LOTTEY"
            placement="right"
            width="155"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <ul>
              <li><Link to="lottery"> 去抽奖</Link></li>
              <li><Link to="ruleManage"> 规则设置</Link></li>
              <li><Link to="resultManage"> 抽奖结果</Link></li>
            </ul>
          </Drawer>
          <Route path="/lottery" component={Lottery} />
          <Route path="/ruleManage" component={RuleManage} />
          <Route path="/resultManage" component={ResultManage} />
        </div>
      </HashRouter>
    );
  }
}

export default Main;
