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
  Form,
  Button,
  Select,
} from 'antd';

import connectFactory from 'utils/connectFactory';
import { CREATE } from 'utils/constants';
import ToolbarContainer from 'components/ToolbarContainer';
import FunctionButtonsContainer from 'components/FunctionButtonsContainer';
import { injectIntl, intlShape } from 'react-intl';
import commonConf from 'config/main.conf';
import { getData } from 'utils/store';

import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal, updateSearchCondition, updateTableData } from '../actions';
import { selectSearchCondition, selectTableData } from '../selectors';
import { updateAwardList, updateCurrentAward } from '../../../state/actions';
import { selectCurrentAward, selectAwardList } from '../../../state/selectors';

const withConnect = connectFactory(NAMESPACE);
const { Option } = Select;
@injectIntl
@withConnect(
  state => ({
    searchCondition: selectSearchCondition(state),
    currentAward: selectCurrentAward(state),
    awardList: selectAwardList(state),
    tableData: selectTableData(state),
  }),
  {
    getDataList,
    updateEntityModal,
    updateTableData,
    updateCurrentAward,
    updateAwardList,
    updateSearchCondition,
  },
)
@Form.create()
class Toolbar extends React.Component {
  state = {
    searchAward: '',
  }

  static propTypes = {
    updateEntityModal: PropTypes.func.isRequired,
    updateTableData: PropTypes.func.isRequired,
    updateAwardList: PropTypes.func.isRequired,
    updateCurrentAward: PropTypes.func.isRequired,
    currentAward: PropTypes.object.isRequired,
    awardList: PropTypes.array.isRequired,
    updateSearchCondition: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
  };

  componentDidMount() {
    const { DBInfo } = commonConf;
    getData(DBInfo.storeName.user).then((res) => {
      if (res && Array.isArray(res)) {
        this.props.updateTableData(res.filter(item => item.award !== '0'));
      }
    });
    getData(DBInfo.storeName.award).then((res) => {
      this.props.updateAwardList(res);
    });
  }

  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateSearchCondition(values);
      }
    });
  }

  handleClickCreate = () => {
    this.props.updateEntityModal({
      type: CREATE,
      show: true,
      data: {},
    });
  }

  handleChange = (value) => {
    this.setState({
      searchAward: value,
    });
    const { DBInfo } = commonConf;
    getData(DBInfo.storeName.user).then((res) => {
      if (res && Array.isArray(res)) {
        if (value === '0') {
          this.props.updateTableData(res.filter(item => item.award !== '0'));
        } else {
          this.props.updateTableData(res.filter(item => Number(item.award) === Number(value)));
        }
      }
    });
  }

  render() {
    const { awardList } = this.props;
    const { searchAward } = this.state;
    return (
      <ToolbarContainer>
        <FunctionButtonsContainer style={{ display: 'flex' }}>
          <Select value={searchAward} placeholder="请选择当前抽奖项" style={{ width: 180, marginLeft: '10px' }} onChange={this.handleChange}>
            <Option key="0" value="0">全部</Option>
            { Array.isArray(awardList) && awardList.map(item => <Option key={item.key} value={item.key}>{item.award_name}</Option>) }
          </Select>
        </FunctionButtonsContainer>
      </ToolbarContainer>);
  }
}

export default Toolbar;
