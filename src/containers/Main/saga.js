/**
 * 控制全局异步请求的基本流程，所有的get、post请求均在此进行处理；
 */

import { notification } from 'antd';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';

import {
  take,
  fork,
  call,
  put,
  cancel,
  select,
} from 'redux-saga/effects';

import {
  FATCH_ACTION_PREFIX,
  FATCH_ACTION_SUCCESS_PREFIX,
  FATCH_ACTION_ERROR_PREFIX,
  DOWNLOAD_ACTION_PREFIX,
  USER_NOT_LOGIN_ERRNO,
  USER_NOT_EXIST_ERRNO,
  // GET_LOGIN_USER_INFO,
} from 'utils/constants';

import { gotoPass } from 'config/pass.conf';

import { showDownloadListModal, updatePlatformAuth } from '../../state/actions';
// import { makeSelectPlatformAuth } from './selectors';

export const getSagaFetchActionType = actionType => actionType && actionType.split('_')[1];

/**
 * @param {*} action {
 *  type: [string], // FATCH_ACTION_PREFIX + ....
 *  service: [function], // 异步调用的service
 *  loadingAction: [function], // actionCreator, 需要对异步设置开始结束标志位
 *  success: [actionObject | function], // actionCreator，成功后的回调，但是不太建议使用，整体流程控制会不太清晰；
 * }
 */
function* fetchSaga(action) {
  try {
    // 若请求需要改变loading状态或者需要对异步设置开始、结束标志位，在action中加入loadingAction参数
    yield action.loadingAction && put(action.loadingAction(true));

    // 调用Service
    const result = yield call(action.service, action.params ? action.params : {});

    // 如果有loading，终止loading
    yield action.loadingAction && put(action.loadingAction(false));

    if (result) {
      if (result.errno === 0 || result.errno === '0') { // 【成功】
        // if (action.type === GET_LOGIN_USER_INFO) {
        //   const platformAuth = yield select(makeSelectPlatformAuth());
        //   if (!platformAuth) { // 同步platformAuth状态
        //     yield put(updatePlatformAuth(true));
        //   }
        // }
        if (action.type.indexOf('_POST_') > -1) { // 预设只有post接口在正确时显示信息
          notification.success({
            message: '操作成功',
          });
        }
        if (action.type.indexOf(DOWNLOAD_ACTION_PREFIX) > -1) { // 下载任务
          notification.success({
            message: '下载任务添加成功',
          });
          yield put(showDownloadListModal());
        }
        // 发送成功action，reducer可据此获得异步数据，更新store；其他saga可拦截此action做进一步的流程控制；
        yield put({ type: `${FATCH_ACTION_SUCCESS_PREFIX}${action.type}`, payload: result });

        // 成功后有后续任务，写在action.success，当多级任务时，考虑使用单独的saga完成
        if (action.success) {
          if (action.success.type) {
            yield put({
              ...action.success,
              payload: action.success.params,
            });
          }
          if (isFunction(action.success)) {
            yield put(action.success());
          }
        }
      } else { // 【失败】
        if (result.errno === USER_NOT_LOGIN_ERRNO) { // 未登录，跳转登录
          gotoPass('login');
          // yield put(updateFix()); // 这个事情就有点难解释了，不更新个store，路由跳转不刷新，先凑合着，回头再细看；
          return;
        }
        if (result.errno === USER_NOT_EXIST_ERRNO) { // pass存在，平台不存在账号
          yield put(updatePlatformAuth(false));
          // yield put(updateFix());
          gotoPass('login');
          return;
        }
        notification.error({ // 不同于请求成功，所有的请求都会暴露失败消息
          message: result.errmsg ? result.errmsg : '操作失败，请稍候再试',
        });
        // 发送失败action，reducer可据此更新store；其他saga可拦截此action做进一步的流程控制；
        yield put({ type: `${FATCH_ACTION_ERROR_PREFIX}${action.type}`, payload: result });
      }
    } else {
      notification.error({
        message: '网络错误，请稍候再试',
      });
      yield put({ type: `${FATCH_ACTION_ERROR_PREFIX}${action.type}`, payload: result });
    }
  } catch (error) {
    yield put({ type: `${FATCH_ACTION_ERROR_PREFIX}${action.type}`, payload: error });

    yield action.loadingAction && put(action.loadingAction(false));
  }
}

// The watcher: watch actions and coordinate worker tasks
function* watchFetchRequests() {
  const taskArray = {};
  // eslint-disable-next-line
  while(true) {
    const action = yield take(
      data => !isEmpty(data.type.match(FATCH_ACTION_PREFIX)),
    );
    const { type } = action;
    if (!type || !action.service) {
      // eslint-disable-next-line
      continue;
    }
    yield taskArray[type] && cancel(taskArray[type].task);
    const task = yield fork(fetchSaga, action);

    taskArray[action.type] = { task, action };
  }
}

export default watchFetchRequests;
