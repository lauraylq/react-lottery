import React from 'react';
import styled from 'styled-components';
import BarCode from '../../../components/BarCode';
import {
  Button, Checkbox,
} from 'antd';

const PrintArea = styled.div`
  background: #fff;
  width: 1000px;
  font-size: 14px;
  border: 1px solid #999;
  margin: 50px;
  padding: 50px;

  .print-head {
    text-align: center;
  }
  .print-code {
    display: flex;
    flex-direction: row;

    .print-code-info {
      width: 300px;
    }
    .print-code-info table td {
      border: none;
      padding: 0 5px;
    }
    .print-code-picture {
      background: black;
      width: 300px;
      height: 50px;
    }
  }

  .print-order {
    margin-top: 20px;
    td {
      padding: 0 5px;
    }
  }
  .print-main {
    width: 100%;
    margin-top: 30px;
    text-align: center;
    border-collapse: collapse;
    thead {
      border-bottom: 1px solid #000;
    }
    thead td {
      border: none;
    }
    td {
      border: 1px solid #000;
    }
  }

  .print-additional {
    border: 1px solid #000;
    width: 300px;
    margin-top: 60px;
    padding: 20px;
    display: flex;
    li {
      list-style-type:none;
    }
  }

  .print-sign {
    text-align: right;
    span {
      display: inline-block;
      border-bottom: 1px solid #000;
      width: 100px;
    }
  }
`;

class PrintPage extends React.Component {
  static propTypes = {
  };

  handlePrint = () => {
    window.print();
  }

  render() {
    return (
      <div>
        <Button onClick={this.handlePrint}>打印</Button>
        <PrintArea id="section-to-print">
          <h1 className="print-head">入库验收单</h1>
          <div className="print-code">
            <div className="print-code-info">
              <table>
                <tbody>
                  <tr>
                    <td>货主代码：</td>
                    <td>FM103</td>
                    <td>供应商代码：</td>
                    <td>101001</td>
                  </tr>
                  <tr>
                    <td>货主名称：</td>
                    <td>FM103</td>
                    <td>供应商名称：</td>
                    <td>101001</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="print-code-picture"></div>
          </div>
          <table className="print-order">
            <tbody>
              <tr>
                <td>入库单号：</td>
                <td>e33232e2ed3e3e3</td>
                <td>预计到货时间：</td>
                <td>2018-11-12 23:00</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>承运方：</td>
                <td>顺丰快递</td>
                <td>承运车辆型号：</td>
                <td>五菱宏光</td>
                <td>承运车辆车牌：</td>
                <td>京QQ000DD</td>
              </tr>
            </tbody>
          </table>
          <table className="print-main">
            <thead>
              <tr>
                <td>序号</td>
                <td>产品货号</td>
                <td>产品名称</td>
                <td>产品规格</td>
                <td>入库入数</td>
                <td>应收数量</td>
                <td>实收数量</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" style={{ border: 'none', height: 10 }}></td>
              </tr>
              <tr>
                <td>1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="print-additional">
            <div>车辆卫生检查：</div>
            <ul>
              <li><Checkbox>无虫害</Checkbox></li>
              <li><Checkbox>无异味</Checkbox></li>
              <li><Checkbox>卫生清洁</Checkbox></li>
            </ul>
          </div>
          <div className="print-sign">
            司机：
            <span>&nbsp;</span>
            验收：
            <span>&nbsp;</span>
          </div>
        </PrintArea>
        <BarCode barCode="Hello" displayValue />
      </div>);
  }
}

export default PrintPage;
