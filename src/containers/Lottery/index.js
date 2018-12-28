import React from 'react';
import commonConf from 'config/main.conf';
import { insert } from 'utils/store';
import { message } from 'antd';
import './index.less';

export default class Lottery extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  // keyDown(e) {
  //   const keyCode = e.code;
  //   if (keyCode === this.keyBand.start) {
  //     this.beginRoll();
  //   } else if (keyCode === this.keyBand.stop) {
  //     this.stopRoll();
  //   }
  // }

  render() {
    return (
      <div className="lottery-main">
        <div className="lottery-title">
          <div className="lottery-name">
            特等奖
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
