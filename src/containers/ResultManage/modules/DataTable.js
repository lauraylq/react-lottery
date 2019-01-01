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
import { updateEntityModal, updateResetPasswordModal } from '../actions';
import { selectPagination, selectSearchCondition, selectTableData } from '../selectors';
import { selectLoading, selectLang, selectCurrentAward, selectAwardMap } from '../../../state/selectors';
import { updateCurrentAward } from '../../../state/actions';

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
    currentAward: selectCurrentAward,
    awardMap: selectAwardMap,
    searchCondition: selectSearchCondition,
    loading: selectLoading,
    lang: selectLang,
  }),
  {
    updateCurrentAward,
    updateEntityModal,
    updateResetPasswordModal,
  },
)
class DataTable extends React.PureComponent {
  // 静态变量，propTypes一定是静态变量，是挂载在类上的；
  static propTypes = {
    updateEntityModal: PropTypes.func.isRequired,
    updateCurrentAward: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    awardMap: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
  };

  componentDidMount() {
    // const { DBInfo } = commonConf;
    // getData(DBInfo.storeName.award).then((res) => {
    //   this.setState({
    //     awardList: res,
    //   });
    // });
  }

  // 静态方法，类的不使用this的函数，一般声明为静态方法；
  showTotal = total => (this.props.intl.formatMessage(commonMessages.total, { total }));

  // 实例变量，挂载在实例上，如若在此变量中未使用this，也可声明为静态变量
  columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
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
    title: '奖项',
    dataIndex: 'award',
    key: 'award',
    render: value => (
      <span>
        {value && this.props.awardMap[value]}
      </span>
    ),
  }];

  handleClickEdit(data) {
    this.props.updateEntityModal({
      type: EDIT,
      show: true,
      data,
    });
  }

  handleChange = (value) => {
    const { awardList } = this.props;
    if (Array.isArray(awardList)) {
      const currentAward = awardList.filter(item => item.key === value);
      if (currentAward[0]) {
        this.props.updateCurrentAward(currentAward[0]);
      }
    }
  }

  render() {
    const { loading, tableData } = this.props;
    return (
      <div>
        {/* <Select value={currentAward.key} style={{ width: 120 }} onChange={this.handleChange}>
          { Array.isArray(awardList) && awardList.map(item => <Option key={item.key} value={item.key}>{item.award_name}</Option>) }
        </Select> */}
        <TableContainer>
          <Table
            bordered
            loading={loading}
            columns={this.columns}
            dataSource={tableData}
            rowKey="key"
            // pagination={{
            //   pageSize: 20,
            // }}
            pagination={false}
          />
        </TableContainer>
      </div>
    );
  }
}

export default DataTable;
