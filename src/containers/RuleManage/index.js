/**
 * author: ylq <458909861@qq.com>
 * date: 2018-12-25 16:03:44
 * pageName: RuleManage
 * pageChineseName: 规则管理
 * parentName: 无
 * template: RuleManage
 */
import React from 'react';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';

import { NAMESPACE } from './constants';
import reducer from './reducer';

import Toolbar from './modules/FunctionsAndSearchToolbar';
import UploadUserData from './modules/UploadUserData';
import Table from './modules/DataTable';
import Modal from './modules/CreateAndEditModal';

const withReducer = injectReducer({ key: NAMESPACE, reducer });

@withRouter
@withReducer
class RuleManage extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Modal />
        <Table />
        <Modal />
      </div>);
  }
}

export default RuleManage;
