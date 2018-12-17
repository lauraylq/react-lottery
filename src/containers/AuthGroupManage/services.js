import { getRequest, postRequest } from 'utils/request';

export const getPrivilegeListService = params => getRequest('/user/basic/getprivilegelist', params);
export const getDataListService = params => getRequest('/user/basic/getrolelist', params);

export const postCreateEntityService = params => postRequest('/test/create', params);

export const postEditEntityService = params => postRequest('/test/edit', params);

export default {};
