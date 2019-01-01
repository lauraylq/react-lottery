import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

export const selectLoading = createSelector(
  selectGlobal,
  subState => subState.get('loading'),
);

export const selectLang = createSelector(
  selectGlobal,
  subState => subState.get('lang'),
);

export const selectCurrentUserInfo = createSelector(
  selectGlobal,
  subState => subState.get('currentUser').toJS(),
);

export const selectCurrentAward = createSelector(
  selectGlobal,
  subState => subState.get('currentAward').toJS(),
);

export const selectAwardList = createSelector(
  selectGlobal,
  subState => subState.get('awardList').toJS(),
);

export const selectAwardMap = createSelector(
  selectGlobal,
  (subState) => {
    const awardList = subState.get('awardList').toJS();
    const awardMap = {};
    if (awardList) {
      awardList.forEach((item) => {
        awardMap[item.id] = item.award_name;
      });
      return awardMap;
    }
    return {};
  },
);

export const selectUserData = createSelector(
  selectGlobal,
  subState => subState.get('userData').toJS(),
);
