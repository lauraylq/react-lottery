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
