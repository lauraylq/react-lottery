import { getRequest } from 'utils/request';

export const getLoginUserInfoService = () => getRequest('/management/basic/getuserauth');
