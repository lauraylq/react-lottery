import React from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import commonConf from 'config/main.conf';
import { insert, clearObjectStore } from 'utils/store';
import {
  message,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import { updateUserData } from '../../../state/actions';


const withConnect = connectFactory('lottery');
@withConnect(
  createStructuredSelector({ // 实用reselect性能有明显的提升；
  }),
  { // 其实这里可以处理掉，当前每引入一个action,需要更新props绑定，更新PropsType，
    // 实际可以直接将action全量引入，但是出于对性能及规范开发的要求，这里仍然使用单独引入的方式；
    updateUserData,
  },
)
class UploadUserData extends React.Component {

  static propTypes = {
    updateUserData: PropTypes.func.isRequired,
  };

  wb = ''; // 读取完成的数据

  // 导入elsx
  importFun = (event) => {
    if (!event.target.files) {
      return;
    }
    const reader = new FileReader();
    const f = event.target.files[0];
    reader.onload = (e) => {
      const data = e.target.result;
      this.wb = XLSX.read(data, {
        type: 'binary',
      });
      const userData = JSON.parse(JSON.stringify(
        XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]),
      ));
      userData.forEach((value, index) => {
        userData[index].id = userData[index]['工号'];
        userData[index].name = userData[index]['姓名'];
        userData[index].sex = userData[index]['性别'] === '男' ? '1' : '2';
        userData[index].award = '0';
        delete userData[index]['工号'];
        delete userData[index]['姓名'];
        delete userData[index]['性别'];
      });
      const { DBInfo } = commonConf;
      if (userData && userData.length) {
        this.props.updateUserData(userData);
        clearObjectStore(DBInfo.storeName.user);
        insert(DBInfo.storeName.user, userData).then((res) => {
          message.success(`已导入${res}条数据`);
        });
      }
      console.log('JSON.stringify(XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])): ', JSON.stringify(XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])));
    };
    reader.readAsBinaryString(f);
  }

  render() {
    return (
      <div>
        <input type="file" onChange={(event) => { this.importFun(event); }} />
        <div id="demo"></div>
      </div>
    );
  }
}
export default UploadUserData;
