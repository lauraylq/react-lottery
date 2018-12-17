// lang
export const DEFAULT_LOCALE = 'zh';

// action
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const LOADING_DATA_ERROR = 'LOADING_DATA_ERROR';
export const SHOW_LOADING = 'SHOW_LOADING';
export const TOOGLE_LANG = 'TOOGLE_LANG';

export const FATCH_ACTION_PREFIX = '@@FETCH_';
export const DOWNLOAD_ACTION_PREFIX = '@@FETCH_DOWNLOAD_';
export const FATCH_ACTION_SUCCESS_PREFIX = 'SUCCESS_';
export const FATCH_ACTION_ERROR_PREFIX = 'ERROR_';

// operate constant
export const CREATE = 'create';
export const EDIT = 'edit';
export const APPROVE = 'approve';
export const DELETE = 'delete';
export const CHECK = 'check';
export const DRAFT = 'draft';

// errno
export const USER_NOT_LOGIN_ERRNO = 110003; // 用户未登陆
export const USER_NOT_EXIST_ERRNO = 110018; // 用户不存在

export const GET_LOGIN_USER_INFO = `${FATCH_ACTION_PREFIX}GET_LOGIN_USER_INFO`;
export const UPDATE_PLATFORM_AUTH = 'UPDATE_PLATFORM_AUTH';
