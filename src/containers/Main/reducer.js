import { fromJS } from 'immutable';
import {
  SHOW_LOADING,
  TOOGLE_LANG,
  GET_LOGIN_USER_INFO,
  FATCH_ACTION_SUCCESS_PREFIX,
  UPDATE_PLATFORM_AUTH,
  UPDATE_CURRENT_AWARD,
  UPDATE_USER_DATA,
  UPDATE_AWARD_LIST,
} from 'utils/constants';

import { getLanguage } from 'utils/i18n';

const initialState = fromJS({
  loading: false,
  lang: getLanguage(),
  currentUser: {},
  platformAuth: true,
  currentAward: {},
  userData: [],
  awardList: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return state.set('loading', action.payload);
    case TOOGLE_LANG:
      return state.set('lang', action.payload);
    case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_LOGIN_USER_INFO}`:
      if (action.payload && action.payload.data) {
        return state.set('currentUser', fromJS(action.payload.data));
      }
      return state;
    case UPDATE_PLATFORM_AUTH:
      localStorage.platformAuth = action.payload;
      return state
        .set('platformAuth', action.payload);
    case UPDATE_CURRENT_AWARD:
      return state.set('currentAward', fromJS(action.payload));
    case UPDATE_USER_DATA:
      return state.set('userData', fromJS(action.payload));
    case UPDATE_AWARD_LIST:
      return state.set('awardList', fromJS(action.payload));
    default:
      break;
  }
  return state;
}

export default reducer;
