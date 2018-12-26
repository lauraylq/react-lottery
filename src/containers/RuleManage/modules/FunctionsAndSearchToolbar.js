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
  Row,
  Col,
  Input,
  Button,
  Select,
} from 'antd';

import connectFactory from 'utils/connectFactory';
import { CREATE } from 'utils/constants';
import ToolbarContainer from 'components/ToolbarContainer';
import FunctionButtonsContainer from 'components/FunctionButtonsContainer';
import { injectIntl, intlShape } from 'react-intl';
import commonMessages from 'utils/commonMessages';
import commonConf from 'config/main.conf';

import messages from '../messages';

import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal, updateSearchCondition } from '../actions';
import { selectSearchCondition } from '../selectors';

const withConnect = connectFactory(NAMESPACE);
const { Option } = Select;
@injectIntl
@withConnect(
  state => ({
    searchCondition: selectSearchCondition(state),
  }),
  {
    getDataList,
    updateEntityModal,
    updateSearchCondition,
  },
)
@Form.create()
class Toolbar extends React.Component {
  static propTypes = {
    getDataList: PropTypes.func.isRequired,
    updateEntityModal: PropTypes.func.isRequired,
    updateSearchCondition: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
  };

  componentDidMount() {

  }

  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getDataList({
          ...values,
          page: 1,
          perpage: commonConf.table.defaultPageSize,
        });
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

  render() {
    return (
      <ToolbarContainer>
        <FunctionButtonsContainer>
          <Button type="primary" onClick={this.handleClickCreate}>创建规则</Button>
        </FunctionButtonsContainer>
      </ToolbarContainer>);
  }
}

export default Toolbar;
