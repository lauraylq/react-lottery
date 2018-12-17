import { connect } from 'react-redux';

import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

function withConnect(mapStateToProps, actions, namespace) {
  const mapMainStateToProps = (state) => {
    if (namespace && isString(namespace)) {
      return mapStateToProps(state, state.get(namespace));
    }
    return mapStateToProps(state);
  };

  const mapDispatchToProps = (dispatch) => {
    const m = {};
    if (isObject(actions)) {
      Object.keys(actions).forEach((actionName) => {
        if (isFunction(actions[actionName])) {
          m[actionName] = data => dispatch(actions[actionName](data));
        }
      });
    }
    return m;
  };

  return connect(mapMainStateToProps, mapDispatchToProps);
}

// eslint-disable-next-line
const connectFactory = namespace => (mapStateToProps, actions) => withConnect(mapStateToProps, actions, namespace);

export default connectFactory;
