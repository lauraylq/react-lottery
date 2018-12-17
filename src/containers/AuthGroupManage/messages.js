/*
 * HomePage Messages
 *
 * This contains all the text for the SystemManage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  authGroupManage: {
    createAuthGroup: {
      id: 'sofa.containers.AuthGroupManage.createAuthGroup',
      defaultMessage: '新建权限组',
    },
    authGroupName: {
      id: 'sofa.containers.AuthGroupManage.authGroupName',
      defaultMessage: '权限组名称',
    },
    authGroupCode: {
      id: 'sofa.containers.AuthGroupManage.authGroupCode',
      defaultMessage: '权限组代码',
    },
    authGroupId: {
      id: 'sofa.containers.AuthGroupManage.authGroupId',
      defaultMessage: '权限组Id',
    },
    accountStatus: {
      id: 'sofa.containers.AuthGroupManage.accountStatus',
      defaultMessage: '账号状态',
    },
    status: {
      id: 'sofa.containers.AuthGroupManage.status',
      defaultMessage: '权限状态',
    },
    statusMap: {
      0: {
        id: 'sofa.containers.AuthGroupManage.statusMap.0',
        defaultMessage: '有效',
      },
      1: {
        id: 'sofa.containers.AuthGroupManage.statusMap.1',
        defaultMessage: '无效',
      },
    },
    create: {
      id: 'sofa.containers.AuthGroupManage.create',
      defaultMessage: '创建',
    },
    edit: {
      id: 'sofa.containers.AuthGroupManage.edit',
      defaultMessage: '修改',
    },
    dataAuth: {
      id: 'sofa.containers.AuthGroupManage.dataAuth',
      defaultMessage: '数据权限',
    },
    operationAuth: {
      id: 'sofa.containers.AuthGroupManage.operationAuth',
      defaultMessage: '操作权限',
    },
    modifyInfo: {
      id: 'sofa.containers.AuthGroupManage.modifyInfo',
      defaultMessage: '修改信息',
    },
  },
});
