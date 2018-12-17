import {
  LOADING_DATA_ERROR,
  SHOW_LOADING,
  TOOGLE_LANG,
  GET_LOGIN_USER_INFO,
  UPDATE_PLATFORM_AUTH,
} from 'utils/constants';

import {
  getLoginUserInfoService,
} from './services';

export function loadingDataError(payload) {
  return {
    type: LOADING_DATA_ERROR,
    payload,
  };
}

export function showLoading(payload) {
  return {
    type: SHOW_LOADING,
    payload,
  };
}

export function toggleLang(payload) {
  return {
    type: TOOGLE_LANG,
    payload,
  };
}

export function getLoginUserInfo() {
  return {
    type: GET_LOGIN_USER_INFO,
    service: getLoginUserInfoService,
  };
}


export function showDownloadListModal() {

}

export function updatePlatformAuth(payload) {
  return {
    type: UPDATE_PLATFORM_AUTH,
    payload,
  };
}

export default {};
