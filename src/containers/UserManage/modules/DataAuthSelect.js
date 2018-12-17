import React from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  TreeSelect,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import { injectIntl, intlShape } from 'react-intl';

import messages from '../messages';
import { NAMESPACE } from '../constants';
import { updateEntityModal, postCreateEntity, postEditEntity } from '../actions';
import { selectEntityModal } from '../selectors';

const withConnect = connectFactory(NAMESPACE);
const FormItem = Form.Item;
const { SHOW_PARENT } = TreeSelect;

const treeData = [{
  title: '仓库1',
  value: '1',
  key: '1',
}, {
  title: '仓库2',
  value: '2',
  key: '2',
}, {
  title: '仓库3',
  value: '3',
  key: '3',
}, {
  title: '仓库4',
  value: '4',
  key: '4',
}];

@injectIntl
@withConnect(
  createStructuredSelector({ // 实用reselect性能有明显的提升；
    entityModal: selectEntityModal,
  }),
  { // 其实这里可以处理掉，当前每引入一个action,需要更新props绑定，更新PropsType，
    // 实际可以直接将action全量引入，但是出于对性能及规范开发的要求，这里仍然使用单独引入的方式；
    updateEntityModal,
    postCreateEntity,
    postEditEntity,
  },
)
@Form.create({
  mapPropsToFields: props => ({
    // 这里埋个坑，没空细看到底发生了什么……
    // email: Form.createFormField({ value: props.entityModal.data.email || '' }),
  }),
})
// eslint-disable-next-line
class DataAuthSelect extends React.PureComponent {
  static propTypes = {
    entityModal: PropTypes.object.isRequired,
    updateEntityModal: PropTypes.func.isRequired,
    postCreateEntity: PropTypes.func.isRequired,
    postEditEntity: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    value: ['0-0-0'],
  };

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { entityModal, intl } = this.props;
    const { data } = entityModal;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择',
      style: {
        // width: 300,
      },
    };
    return (
      <FormItem
        {...formItemLayout}
        label={intl.formatMessage(messages.userManage.dataAuth)}
      >
        { getFieldDecorator('auth', {
          initialValue: data.auth || '',
        })(
          <TreeSelect {...tProps} />,
        )}
      </FormItem>
    );
  }
}

export default DataAuthSelect;
