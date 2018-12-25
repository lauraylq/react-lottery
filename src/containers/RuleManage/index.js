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
import injectSaga from 'utils/injectSaga';

import { NAMESPACE } from './constants';
import reducer from './reducer';
import saga from './saga';

import Toolbar from './modules/FunctionsAndSearchToolbar';
import UploadUserData from './modules/UploadUserData';
// import Table from './modules/DataTable';
import Modal from './modules/CreateAndEditModal';
// import ResetPasswordModal from './modules/ResetPasswordModal';

const withReducer = injectReducer({ key: NAMESPACE, reducer });
const withSaga = injectSaga({ key: NAMESPACE, saga });

@withRouter
@withSaga
@withReducer
class RuleManage extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
        <UploadUserData />
        <Modal />
        {/* <Table />
        <Modal />
        <ResetPasswordModal /> */}
      </div>);
  }
}

export default RuleManage;
