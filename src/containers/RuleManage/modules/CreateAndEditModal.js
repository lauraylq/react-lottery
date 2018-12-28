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
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import { CREATE, EDIT } from 'utils/constants';
import { injectIntl, intlShape } from 'react-intl';
import commonMessages from 'utils/commonMessages';
import commonConf from 'config/main.conf';
import { insert, getData, getDataByKey } from 'utils/store';

import { NAMESPACE } from '../constants';
import { updateEntityModal, postCreateEntity, postEditEntity } from '../actions';
import { selectEntityModal, selectEntityModalType } from '../selectors';

const withConnect = connectFactory(NAMESPACE);

const FormItem = Form.Item;
const { Option } = Select;

function isModify(type) {
  return type === 'EDIT';
}
@injectIntl
@withConnect(
  createStructuredSelector({ // 实用reselect性能有明显的提升；
    entityModal: selectEntityModal,
    type: selectEntityModalType,
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
class CreateAndEditModal extends React.PureComponent {
  static propTypes = {
    entityModal: PropTypes.object.isRequired,
    updateEntityModal: PropTypes.func.isRequired,
    postCreateEntity: PropTypes.func.isRequired,
    postEditEntity: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    type: PropTypes.string.isRequired,
  };

  state = {
  };

  handleOk = (e) => {
    e.preventDefault();
    const { type } = this.props.entityModal;
    const { DBInfo } = commonConf;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (type === CREATE) {
          insert(DBInfo.storeName.award, values).then((res) => {
            this.props.updateEntityModal({
              type: CREATE,
              show: false,
              data: {},
            });
          });
        } else if (type === EDIT) {
          this.props.postEditEntity(values);
        }
      }
    });
  }

  handleCancel = () => {
    this.props.updateEntityModal({
      type: CREATE,
      show: false,
      data: {},
    });
  }

  render() {
    const { entityModal, intl, type } = this.props;
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

    return (
      <div>
        <Modal
          width={700}
          title={isModify(type)
            ? '修改规则'
            : '创建规则'}
          visible={entityModal.show}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={intl.formatMessage(commonMessages.ok)}
          cancelText={intl.formatMessage(commonMessages.cancel)}
        >
          <Form
            className="sofa-modal-form"
            onSubmit={this.handleSubmit}
          >
            <FormItem
              {...formItemLayout}
              label="奖项名称"
            >
              {getFieldDecorator('award_name', {
                initialValue: data.award_name || '',
                rules: [{
                  required: true, message: '该项为必填项!',
                }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="奖品名称"
            >
              {getFieldDecorator('award_content', {
                initialValue: data.award_content || '',
                rules: [{ required: true, message: '该项为必填项!' }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="奖项人数"
            >
              {getFieldDecorator('award_num', {
                initialValue: data.award_num || '',
                rules: [{ required: true, message: '该项为必填项!' }],
              })(
                <InputNumber min={0} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="单次抽取"
            >
              {getFieldDecorator('single_num', {
                initialValue: data.single_num || '',
                rules: [{ required: true, message: '该项为必填项!' }],
              })(
                <InputNumber min={0} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {getFieldDecorator('sex', {
                initialValue: data.sex || '',
                rules: [{ required: true, message: '该项为必填项!' }],
              })(
                <Select>
                  <Option value="0">全部</Option>
                  <Option value="1">男</Option>
                  <Option value="2">女</Option>
                </Select>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>);
  }
}

export default CreateAndEditModal;
