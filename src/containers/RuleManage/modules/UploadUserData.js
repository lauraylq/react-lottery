import React from 'react';
import XLSX from 'xlsx';
import commonConf from 'config/main.conf';
import { insert } from 'utils/store';
import { message } from 'antd';

export default class UploadUserData extends React.Component {
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
        userData[index].sex = userData[index]['性别'];
        delete userData[index]['工号'];
        delete userData[index]['姓名'];
        delete userData[index]['性别'];
      });
      const { DBInfo } = commonConf;
      if (userData && userData.length) {
        insert(DBInfo.DBName, DBInfo.storeName.user, userData).then((res) => {
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
