import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';

/**
 * 对Menu数据进行了加工，将叶子节点及其对应的路由进行了自动生成，用以减少新增模块对路由进行的修改
 * @param {} arr 待遍历数据
 * @param {*} keyPath 关键路径
 */
function traversMenu(arr, keyPath = []) {
  let leafsArray = [];

  arr.forEach((item) => {
    const newKeyPath = keyPath.concat([item.key]);

    if (item.children) {
      leafsArray = leafsArray.concat(traversMenu(item.children, [...newKeyPath]));
    } else {
      leafsArray.push({
        path: `/${newKeyPath.join('/')}`,
        componentName: `${item.key.substring(0, 1).toUpperCase()}${item.key.substring(1)}`,
      });
    }
  });
  return leafsArray;
}

@withRouter
// eslint-disable-next-line
class CoreRoute extends React.PureComponent {
  static propTypes = {
    menuConf: PropTypes.array.isRequired,
  };

  static makePathToComponent = menu => traversMenu(menu);

  render() {
    const { menuConf } = this.props;

    const pathToComponentArr = CoreRoute.makePathToComponent(menuConf);

    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        { pathToComponentArr.map(item => (
          <Route
            key={item.componentName}
            path={item.path}
            component={Loadable({
              loader: () => import(`../${item.componentName}`),
              loading: LoadingIndicator,
            })}
          />))
        }
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default CoreRoute;
