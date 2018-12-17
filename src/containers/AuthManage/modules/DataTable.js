import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import TableContainer from 'components/TableContainer';
import TableButton from 'components/TableButton';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import commonMessages from 'utils/commonMessages';
import { EDIT } from 'utils/constants';

import messages from '../messages';
import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal } from '../actions';
import { selectPagination, selectSearchCondition, selectTableData } from '../selectors';
import { selectLoading, selectLang } from '../../../state/selectors';

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
  },
)
class DataTable extends React.PureComponent {
  // 静态变量，propTypes一定是静态变量，是挂载在类上的；
  static propTypes = {
    tableData: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    getDataList: PropTypes.func.isRequired,
    updateEntityModal: PropTypes.func.isRequired,
    searchCondition: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
  };

  // 静态方法，类的不使用this的函数，一般声明为静态方法；
  showTotal = total => (this.props.intl.formatMessage(commonMessages.total, { total }));

  // 实例变量，挂载在实例上，如若在此变量中未使用this，也可声明为静态变量
  columns = [{
    title: this.props.intl.formatMessage(messages.authManage.authId),
    dataIndex: 'privilege_id',
    key: 'privilege_id',
  }, {
    title: this.props.intl.formatMessage(messages.authManage.authName),
    dataIndex: 'name',
    key: 'name',
  }, {
    title: this.props.intl.formatMessage(messages.authManage.status),
    dataIndex: 'is_delete',
    key: 'is_delete',
    render: text => <FormattedMessage {...messages.authManage.statusMap[text]} />,
  }, {
    title: this.props.intl.formatMessage(commonMessages.operate),
    width: 150,
    key: 'action',
    render: (value, row) => (
      <div>
        <TableButton onClick={() => this.handleClickEdit(row)}>
          {this.props.intl.formatMessage(messages.authManage.modifyInfo)}
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

  // 实例变量/方法，使用了箭头函数做this的绑定，若无特殊传参，在render函数中优先使用这种方式进行函数声明；
  handlePageChange = (page) => {
    const { searchCondition, pagination } = this.props;

    this.props.getDataList({
      ...searchCondition,
      perpage: pagination.pageSize,
      page,
    });
  }

  render() {
    const { tableData, pagination, loading } = this.props;
    return (
      <TableContainer>
        <Table
          bordered
          loading={loading}
          columns={this.columns}
          dataSource={tableData}
          rowKey="id"
          pagination={{
            current: pagination.page,
            total: pagination.total,
            pageSize: pagination.pageSize,
            showTotal: this.showTotal,
            onChange: this.handlePageChange,
          }}
        />
      </TableContainer>
    );
  }
}

export default DataTable;
