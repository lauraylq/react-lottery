import conformsTo from 'lodash/conformsTo';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import invariant from 'invariant';

export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    injectedReducers: isObject,
    // injectedSagas: isObject,
  };

  // invariant(
  //   conformsTo(store, shape),
  //   'injectors: Expected a valid redux store',
  // );
}
