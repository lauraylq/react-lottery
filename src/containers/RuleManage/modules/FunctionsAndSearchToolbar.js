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
import { Link } from 'react-router-dom';
import { CREATE } from 'utils/constants';
import ToolbarContainer from 'components/ToolbarContainer';
import FunctionButtonsContainer from 'components/FunctionButtonsContainer';
import { injectIntl, intlShape } from 'react-intl';
import commonConf from 'config/main.conf';
import { getData } from 'utils/store';

import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal, updateSearchCondition } from '../actions';
import { selectSearchCondition } from '../selectors';
import { updateAwardList, updateCurrentAward } from '../../../state/actions';
import UploadUserData from './UploadUserData';
import { selectCurrentAward, selectAwardList } from '../../../state/selectors';

const withConnect = connectFactory(NAMESPACE);
const { Option } = Select;
@injectIntl
@withConnect(
  state => ({
    searchCondition: selectSearchCondition(state),
    currentAward: selectCurrentAward(state),
    awardList: selectAwardList(state),
  }),
  {
    getDataList,
    updateEntityModal,
    updateCurrentAward,
    updateAwardList,
    updateSearchCondition,
  },
)
@Form.create()
class Toolbar extends React.Component {
  static propTypes = {
    updateEntityModal: PropTypes.func.isRequired,
    updateAwardList: PropTypes.func.isRequired,
    updateCurrentAward: PropTypes.func.isRequired,
    currentAward: PropTypes.object.isRequired,
    awardList: PropTypes.array.isRequired,
    updateSearchCondition: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
  };

  componentDidMount() {
    const { DBInfo } = commonConf;
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
    const { awardList } = this.props;
    if (Array.isArray(awardList)) {
      const currentAward = awardList.filter(item => item.key === value);
      if (currentAward[0]) {
        this.props.updateCurrentAward(currentAward[0]);
      }
    }
  }

  render() {
    const { currentAward, awardList } = this.props;
    return (
      <ToolbarContainer>
        <FunctionButtonsContainer style={{ display: 'flex' }}>
          <Button type="primary" onClick={this.handleClickCreate}>创建规则</Button>
          <UploadUserData />
          <Select value={currentAward.key} placeholder="请选择当前抽奖项" style={{ width: 180, marginLeft: '10px' }} onChange={this.handleChange}>
            { Array.isArray(awardList) && awardList.map(item => <Option key={item.key} value={item.key}>{item.award_name}</Option>) }
          </Select>
          <Button style={{ marginLeft: '10px', border: 'none', fontWeight: 'bold' }}><Link to="lottery"> 点我去抽奖</Link></Button>
        </FunctionButtonsContainer>
      </ToolbarContainer>);
  }
}

export default Toolbar;
