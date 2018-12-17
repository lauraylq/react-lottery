import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import checkStore from './checkStore';
import createReducer from '../state/reducers';

export function injectReducerFactory(store, isVaild) {
  return function injectReducer(key, reducer) {
    if (!isVaild) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      'injectReducer: Expected `reducer` to be a reducer function',
    );

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    // eslint-disable-next-line
    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
