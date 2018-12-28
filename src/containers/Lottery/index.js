import React from 'react';
import PropTypes from 'prop-types';
import {
  message,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import { getData } from 'utils/store';
import commonConf from 'config/main.conf';
import { selectCurrentAward } from '../../state/selectors';
import './index.less';


const withConnect = connectFactory('lottery');
@withConnect(
  // 可以使用者两种方式mapstatetoprops 但是推荐使用select的方式，经测会减少渲染次数，性能较好；
  // (globalState, state) => ({
  //   tableData: state.get('tableData').toJS(),
  //   pagination: state.get('pagination').toJS(),
  //   searchCondition: state.get('searchCondition').toJS(),
  //   loading: globalState.getIn(['global', 'loading']),
  // }),
  createStructuredSelector({
    currentAward: selectCurrentAward,
  }),
)
class Lottery extends React.Component {
  state = {
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  static propTypes = {
    currentAward: PropTypes.object,
  };
  // keyDown(e) {
  //   const keyCode = e.code;
  //   if (keyCode === this.keyBand.start) {
  //     this.beginRoll();
  //   } else if (keyCode === this.keyBand.stop) {
  //     this.stopRoll();
  //   }
  // }

  render() {
    const { currentAward } = this.props;
    return (
      <div className="lottery-main">
        <div className="lottery-title">
          <div className="lottery-name">
            {currentAward && currentAward.award_name}
          </div>
          <div className="lottery-roll">
            杨立琦 01376542
          </div>
        </div>
        <div className="lottery-result">
        </div>
      </div>
    );
  }
}

export default Lottery;
