import {
  LOADING_DATA_ERROR,
  SHOW_LOADING,
  TOOGLE_LANG,
  GET_LOGIN_USER_INFO,
  UPDATE_PLATFORM_AUTH,
  UPDATE_CURRENT_AWARD,
  UPDATE_USER_DATA,
  UPDATE_AWARD_LIST,
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

export function updateCurrentAward(payload) {
  return {
    type: UPDATE_CURRENT_AWARD,
    payload,
  };
}

export function updateUserData(payload) {
  return {
    type: UPDATE_USER_DATA,
    payload,
  };
}

export function updateAwardList(payload) {
  return {
    type: UPDATE_AWARD_LIST,
    payload,
  };
}

export default {};
