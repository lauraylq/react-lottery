import React from 'react';
import PropTypes from 'prop-types';
import {
  message,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import { updateData } from 'utils/store';
import commonConf from 'config/main.conf';
import { selectCurrentAward, selectUserData } from '../../state/selectors';
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
    userData: selectUserData,
  }),
  { // 其实这里可以处理掉，当前每引入一个action,需要更新props绑定，更新PropsType，
    // 实际可以直接将action全量引入，但是出于对性能及规范开发的要求，这里仍然使用单独引入的方式；
  },
)
class Lottery extends React.Component {
  state = {
    rollIdArr: [], // 当前抽中集合
    showResult: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  static propTypes = {
    currentAward: PropTypes.object.isRequired,
    userData: PropTypes.array.isRequired,
  };

  isBegin = false;

  timeInterJS = null;

  intervalTime = 100; // 滚动间隔

  currentSingleNum = 0; // 计算后单次抽奖数

  rollIdArr = [];

  rollLen = 0 // 本轮已抽中用户数

  keyDown = (e) => {
    const keyCode = e.code;
    if (keyCode === 'Enter') {
      this.startScroll();
    }
    if (keyCode === 'Space') {
      this.stopScroll();
    }
  }

  // 1.开始滚动
  startScroll = () => {
    if (!this.isBegin) {
      this.setState({
        showResult: false,
      });
      const { currentAward, userData } = this.props;
      const { award_num, single_num } = currentAward;
      this.currentSingleNum = single_num;

      const tempLast = award_num - this.rollLen;
      // 若小于单次最大抽奖人数
      if (!tempLast && tempLast < single_num) {
        this.currentSingleNum = tempLast.toString();
      }

      const currentAwardNum = userData.filter(item => Number(item.award) === Number(this.props.currentAward.id));
      if (award_num <= currentAwardNum.length) {
        message.warning('本轮已抽取完毕');
        return false;
      }
      // 抽奖池内剩余人数
      const leftUser = userData.filter(item => item.award !== '0');
      const tempRoll = userData.length - leftUser.length;
      if (!this.currentSingleNum) {
        return false;
      }
      if (tempRoll <= this.currentSingleNum) {
        message.warning(`池内剩余总数${tempRoll}，不够本次抽取${this.currentSingleNum}！`);
        return false;
      }

      // 定时器滚动
      this.isBegin = true;
      this.timeInterJS = setInterval(this.roll, this.intervalTime);
    }
  }

  // 滚动主要函数
  roll = () => {
    // 先清空抽中集合数组
    this.rollIdArr = [];
    // 更新抽中集合
    while (this.rollIdArr.length < this.currentSingleNum) {
      const rnd = this.getRand();
      const { userData } = this.props;
      const obj = userData[rnd];
      if (obj.award === '0') {
        this.rollIdArr.push(obj);
        this.setState({
          rollIdArr: this.rollIdArr,
        });
      }
    }
  }

  // 随机比例返回抽取结果
  getRand = () => {
    return Math.floor(Math.random() * this.props.userData.length);
  }

  // 1.停止滚动
  stopScroll = () => {
    if (this.isBegin) {
      clearInterval(this.timeInterJS);
      // 设置抽中人奖项并同步至indexDB
      this.rollIdArr.map((item) => {
        item.award = this.props.currentAward.key;
        const { DBInfo } = commonConf;
        updateData(DBInfo.storeName.user, item.id, item).then((res) => {
          console.log(res);
        });
        this.rollLen += this.state.rollIdArr.length;
      });
      this.setState({
        showResult: true,
      });
      this.isBegin = false;
    }
  }

  render() {
    const { currentAward, showResult } = this.props;
    const { rollIdArr } = this.state;
    return (
      <div className="lottery-wrapper">
        <div className="lottery-main">
          <div className="lottery-title">
            <div className="lottery-name">
              {currentAward && currentAward.award_name}
            </div>
            <div className="lottery-roll">
              {/* {
                rollIdArr && rollIdArr.map(item => (
                  <span key={item.id}>{ `${item.name} ${item.id}`}</span>
                ))
              } */}
              {
                rollIdArr[0] && (
                  <span key={rollIdArr[0].id}>{ `${rollIdArr[0].name} ${rollIdArr[0].id}`}</span>
                )
              }
            </div>
          </div>
        </div>
        <div className="lottery-result" style={{ display: this.state.showResult ? 'flex' : 'none' }}>
          {
            rollIdArr[0] && (
              <span key={rollIdArr[0].id}>{ `${rollIdArr[0].name} ${rollIdArr[0].id}`}</span>
            )
          }
        </div>
      </div>
    );
  }
}

export default Lottery;
