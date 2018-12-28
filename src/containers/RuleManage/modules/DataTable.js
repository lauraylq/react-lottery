/**
 * author: ylq <458909861@qq.com>
 * date: 2018-12-25 16:03:44
 * pageName: RuleManage
 * pageChineseName: 规则管理
 * parentName: 无
 * template: RuleManage
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Select,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import TableContainer from 'components/TableContainer';
import TableButton from 'components/TableButton';
import { injectIntl, intlShape } from 'react-intl';
import commonMessages from 'utils/commonMessages';
import { EDIT } from 'utils/constants';
import commonConf from 'config/main.conf';
import { getData } from 'utils/store';

import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal, updateResetPasswordModal } from '../actions';
import { selectPagination, selectSearchCondition, selectTableData } from '../selectors';
import { selectLoading, selectLang } from '../../../state/selectors';

const { Option } = Select;
const withConnect = connectFactory(NAMESPACE);
@injectIntl
@withConnect(
  // 可以使用者两种方式mapstatetoprops 但是推荐使用select的方式，经测会减少渲染次数，性能较好；
  // (globalState, state) => ({
  //   tableData: state.get('tableData').toJS(),
  //   pagination: state.get('pagination').toJS(),
  //   searchCondition: state.get('searchCondition').toJS(),
  //   loading: globalState.getIn(['global', 'loading']),
  // }),
  createStructuredSelector({
    tableData: selectTableData,
    pagination: selectPagination,
    searchCondition: selectSearchCondition,
    loading: selectLoading,
    lang: selectLang,
  }),
  {
    getDataList,
    updateEntityModal,
    updateResetPasswordModal,
  },
)
class DataTable extends React.PureComponent {
  state = {
    dateList: [],
  };

  // 静态变量，propTypes一定是静态变量，是挂载在类上的；
  static propTypes = {
    updateEntityModal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
  };

  componentDidMount() {
    const { DBInfo } = commonConf;
    getData(DBInfo.storeName.award).then((res) => {
      this.setState({
        dateList: res,
      });
    });
  }

  // 静态方法，类的不使用this的函数，一般声明为静态方法；
  showTotal = total => (this.props.intl.formatMessage(commonMessages.total, { total }));

  // 实例变量，挂载在实例上，如若在此变量中未使用this，也可声明为静态变量
  columns = [{
    title: 'id',
    dataIndex: 'key',
    key: 'key',
  }, {
    title: '奖项名称',
    dataIndex: 'award_name',
    key: 'award_name',
  }, {
    title: '奖品名称',
    dataIndex: 'award_content',
    key: 'award_content',
  }, {
    title: '奖项人数',
    dataIndex: 'award_num',
    key: 'award_num',
  }, {
    title: '单次抽取',
    dataIndex: 'single_num',
    key: 'single_num',
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: value => (
      <span>
        {value && commonConf.sexMap[value]}
      </span>
    ),
  }, {
    title: this.props.intl.formatMessage(commonMessages.operate),
    width: 250,
    key: 'action',
    render: (value, row) => (
      <div>
        <TableButton onClick={() => this.handleClickEdit(row)}>
          修改规则
        </TableButton>
      </div>
    ),
  }];

  handleClickEdit(data) {
    this.props.updateEntityModal({
      type: EDIT,
      show: true,
      data,
    });
  }

  render() {
    const { loading } = this.props;
    const { dateList } = this.state;
    return (
      <div>
        <Select defaultValue="lucy" style={{ width: 120 }}>
          <Option value="lucy">Lucy</Option>
        </Select>
        <TableContainer>
          <Table
            bordered
            loading={loading}
            columns={this.columns}
            dataSource={dateList}
            rowKey="id"
            pagination={{
              pageSize: 20,
            }}
          />
        </TableContainer>
      </div>
    );
  }
}

export default DataTable;
