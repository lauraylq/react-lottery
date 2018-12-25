/**
 * author: ylq <458909861@qq.com>
 * date: 2018-12-25 16:03:44
 * pageName: RuleManage
 * pageChineseName: 规则管理
 * parentName: 无
 * template: RuleManage
 */
import { getRequest, postRequest } from 'utils/request';

export const getDataListService = params => getRequest('/test/getUserList', params);

export const postCreateEntityService = params => postRequest('/test/create', params);

export const postEditEntityService = params => postRequest('/test/edit', params);

export const getPrivilegeListService = params => getRequest('/user/basic/getprivilegelist', params);

export default {};
