import { getRequest, postRequest } from 'utils/request';

export const getDataListService = params => getRequest('/user/basic/getprivilegelist', params);

export const postCreateEntityService = params => postRequest('/test/create', params);

export const postEditEntityService = params => postRequest('/test/edit', params);

export default {};
