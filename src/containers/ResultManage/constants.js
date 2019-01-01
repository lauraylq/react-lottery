/**
 * author: ylq <458909861@qq.com>
 * date: 2018-12-25 16:03:44
 * pageName: RuleManage
 * pageChineseName: 规则管理
 * parentName: 无
 * template: RuleManage
 */
import { FATCH_ACTION_PREFIX } from 'utils/constants';

export const NAMESPACE = 'RuleManage';

export default {
  NAMESPACE,
};

export const GET_DATA_LIST = `${FATCH_ACTION_PREFIX}GET_DATA_LIST_${NAMESPACE}`;

export const GET_PRIVILEGE_LIST = `${FATCH_ACTION_PREFIX}GET_PRIVILEGE_LIST_${NAMESPACE}`;

export const UPDATE_SEARCH_CONDITION = `UPDATE_SEARCH_CONDITION_${NAMESPACE}`;

export const POST_CREATE_ENTITY = `${FATCH_ACTION_PREFIX}POST_CREATE_ENTITY_${NAMESPACE}`;

export const POST_EDIT_ENTITY = `${FATCH_ACTION_PREFIX}POST_EDIT_ENTITY_${NAMESPACE}`;

export const UPDATE_ENTITY_MODAL = `UPDATE_ENTITY_MODAL_${NAMESPACE}`;

export const UPDATE_TABLE_DATA = `UPDATE_TABLE_DATA_${NAMESPACE}`;

export const UPDATE_RESET_PASSWORD_MODAL = `UPDATE_RESET_PASSWORD_MODAL_${NAMESPACE}`;
