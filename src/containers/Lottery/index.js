import React from 'react';
import PropTypes from 'prop-types';
import {
  message,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import { updateData, getData } from 'utils/store';
import screenshot from 'utils/screenshot';
import commonConf from 'config/main.conf';
import { selectCurrentAward, selectUserData } from '../../state/selectors';
import { updateUserData } from '../../state/actions';
import './index.less';

const withConnect = connectFactory('lottery');
@withConnect(
  createStructuredSelector({
    currentAward: selectCurrentAward,
    userData: selectUserData,
  }),
  {
    updateUserData,
  },
)
class Lottery extends React.Component {
  state = {
    rollIdArr: [], // 当前抽中集合
    resultArr: [], // 当前抽中所有结果
    showResult: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  static propTypes = {
    currentAward: PropTypes.object.isRequired,
    userData: PropTypes.array.isRequired,
    updateUserData: PropTypes.func.isRequired,
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
      const { currentAward, userData } = this.props;
      const { award_num, single_num } = currentAward;
      this.currentSingleNum = single_num;

      // 防止刷新页面后state重置，故重新获取
      const resultNum = userData.filter(item => Number(item.award) === Number(currentAward.id));

      // 当前剩余抽奖数
      const tempLast = award_num - resultNum.length;
      // 若小于单次最大抽奖人数
      if (tempLast && tempLast < single_num) {
        this.currentSingleNum = tempLast.toString();
      }

      if (award_num <= resultNum.length) {
        this.rollLen = 0;
        message.warning('本轮已抽取完毕');
        this.setState({
          showResult: false,
        });
        return false;
      }
      // 抽奖池内剩余人数
      const leftUser = userData.filter(item => item.award !== '0');
      const tempRoll = userData.length - leftUser.length;
      if (!this.currentSingleNum) {
        return false;
      }
      if (tempRoll < this.currentSingleNum) {
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
    this.setState({
      rollIdArr: 0,
    }, this.updateAwardArr);
  }

  // 更新抽中集合
  updateAwardArr = () => {
    while (this.rollIdArr.length < this.currentSingleNum) {
      const { userData, currentAward } = this.props;
      // 除去已抽奖人
      const userDataleft = userData.filter(item => item.award === '0');
      const rnd = this.getRand(userDataleft.length);
      const obj = userDataleft[rnd];
      if (obj) {
        // 考虑并排显示N个人同时抽奖情况
        if (!this.rollIdArr.find(item => item.id === obj.id)) {
          if (currentAward.sex === '0' || obj.sex === currentAward.sex) {
            this.rollIdArr.push(obj);
            this.setState({
              rollIdArr: this.rollIdArr,
            });
          }
        }
      }
    }
  }

  // 随机比例返回抽取结果
  getRand = (param) => {
    return Math.floor(Math.random() * param);
  }

  // 1.停止滚动
  stopScroll = () => {
    if (this.isBegin) {
      const { currentAward } = this.props;
      clearInterval(this.timeInterJS);
      // 设置抽中人奖项并同步至indexDB
      this.rollIdArr.map((item) => {
        item.award = currentAward.id;
        const { DBInfo } = commonConf;
        updateData(DBInfo.storeName.user, item.id, item).then((response) => {
          getData(DBInfo.storeName.user).then((res) => {
            this.props.updateUserData(res);
            const resultArr = res.filter(item1 => Number(item1.award) === Number(currentAward.id));
            this.setState({
              showResult: true,
              resultArr,
            });
          });
        });
        this.rollLen += this.state.rollIdArr.length;
      });
      if (commonConf.download.show) {
        setTimeout(() => {
          screenshot(currentAward.award_name, currentAward.award_num);
        }, commonConf.download.delay);
      }
      this.isBegin = false;
    }
  }

  render() {
    const { currentAward } = this.props;
    const { rollIdArr, resultArr } = this.state;
    return (
      <div className="lottery-wrapper">
        <div className="lottery-main">
          <div className="lottery-title">
            <div className="lottery-name">
              {currentAward && currentAward.award_name}
            </div>
            <div className="lottery-roll">
              {
                rollIdArr[0] && (
                  <span key={rollIdArr[0].id}>{ `${rollIdArr[0].name} ${rollIdArr[0].id}`}</span>
                )
              }
            </div>
          </div>
        </div>
        <div className="lottery-result" style={{ display: this.state.showResult ? 'block' : 'none' }}>
          <div className="lottery-result-text" style={{ lineHeight: resultArr.length >= 5 ? '10vh' : '', width: resultArr.length >= 5 ? '126vh' : '' }}>
            {
              resultArr && resultArr.length < 5 && resultArr.map(item => (
                <div className={`result-style-${resultArr.length}`} key={item.id}>
                  <span className="result-name">{ `${item.name}`}</span>
                  <span>{ `${item.id}`}</span>
                </div>
              ))
            }
            {
              resultArr && resultArr.length >= 5 && resultArr.map(item => (
                <div className="result-style-10" key={item.id}>
                  <span className="result-name">{`${item.name}`}</span>
                  <span>{`${item.id}`}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Lottery;
