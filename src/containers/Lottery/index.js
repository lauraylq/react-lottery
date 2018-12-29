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
    isScroll: false,
    awardNum: '', // 奖项人数
    singleNum: '', // 单次抽取人数
    sex: '', // 性别
    rollIdArr: [], // 当前抽中集合
    rollLen: 0, // 本轮已抽中用户数
  };

  componentDidMount() {
    window.addEventListener('keydown', e => this.keyDown(e));
    const awardRule = this.props.currentAward;
    if (this.props.currentAward) {
      this.setState({
        awardNum: awardRule.award_num,
        singleNum: awardRule.single_num,
        sex: awardRule.sex,
      });
    }
  }

  static propTypes = {
    currentAward: PropTypes.object,
  };

  keyDown(e) {
    const keyCode = e.code;
    if (keyCode === 'Space') {
      const { isScroll } = this.state;
      if (isScroll) {
        this.setState({
          isScroll: false,
        });
        this.startScroll();
      } else {
        this.setState({
          isScroll: true,
        });
        this.stopScroll();
      }
    }
  }

  // 1.开始滚动
  startScroll = () => {
    console.log('start');
    const tempLast = this.state.awardNum - this.state.rollLen;
    // 若小于单次最大抽奖人数
    if (!!tempLast && tempLast < this.state.singleNum) {
      this.setState({
        singleNum: tempLast.toString(),
      });
    }

    // 若已抽完
    if (tempLast === 0) {
      message.warning('本轮已抽取完毕');
      return false;
    }
  }

  // 1.开始滚动
  stopScroll = () => {
    console.log('stop');
  }

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
