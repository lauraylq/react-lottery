import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const selectNamespace = state => state.get(NAMESPACE);

export const selectSearchCondition = createSelector(
  selectNamespace,
  subState => subState.get('searchCondition').toJS(),
);

export const selectPagination = createSelector(
  selectNamespace,
  subState => subState.get('pagination').toJS(),
);

export const selectEntityModal = createSelector(
  selectNamespace,
  subState => subState.get('entityModal').toJS(),
);

export const selectResetPasswordModal = createSelector(
  selectNamespace,
  subState => subState.get('resetPasswordModal').toJS(),
);

export const selectEntityModalType = createSelector(
  selectNamespace,
  subState => subState.get('entityModal').toJS().type,
);

export const selectTableData = createSelector(
  selectNamespace,
  subState => subState.get('tableData').toJS(),
);

export const selectOperationAuth = createSelector(
  selectNamespace,
  subState => subState.get('operationAuth').toJS().map(item => ({
    key: item.privilege_id,
    title: item.name,
  })),
);

export default {};
