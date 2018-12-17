import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

let calcHeight = '0px';
let tableHeight = '0px';
let tableInnerHeight = '0px';
const Container = styled.div`
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 10px;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
  overflow: hidden ;
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 8px 16px;
  }
`;

class TableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.resizeListener = this.resizeListener.bind(this);
    this.state = {
      calcHeight: '0px',
      tableInnerHeight: '0px',
    };
  }

  static propTypes = {
    setScrollY: PropTypes.func,
    children: PropTypes.object,
  }

  componentWillMount() {
    window.addEventListener('resize', this.resizeListener);
  }

  componentDidMount() {
    this.resizeListener();
  }

  componentWillReceiveProps() {
    this.setScrollY();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  setScrollY = () => {
    if (this.props.setScrollY) {
      this.props.setScrollY(this.state.tableInnerHeight);
    }
  }

  // TODO: 一顿操作猛如虎，我没来得及细看……
  resizeListener() {
    // eslint-disable-next-line
    if (!ReactDom.findDOMNode(this.refDom)) {
      return;
    }
    // eslint-disable-next-line
    let top = ReactDom.findDOMNode(this.refDom).offsetTop;
    // eslint-disable-next-line
    if (ReactDom.findDOMNode(this.refDom)) {
      // eslint-disable-next-line
      top = ReactDom.findDOMNode(this.refDom).offsetTop;
    }
    const innerHeight = document.body.offsetHeight;
    calcHeight = `${innerHeight - top - 10}px`;
    tableHeight = `${innerHeight - top - 90}px`;
    tableInnerHeight = `${innerHeight - top - 130}px`;
    const fitDom = document.getElementsByClassName('table_container_fitable')[0];
    if (fitDom) {
      const tableDom = fitDom.getElementsByClassName('ant-table')[0];
      // const tableContent = fitDom.getElementsByClassName('ant-table-content')[0];
      tableDom.setAttribute('style', `overflow:auto;height: ${tableHeight}`);
      // tableContent.setAttribute('style',`overflow:auto;height: ${tableHeight}`);
      this.setState({
        calcHeight,
        tableInnerHeight,
      });
    } else {
      this.setState({
        calcHeight,
        tableInnerHeight,
      });
    }
    this.setScrollY();
  }

  render() {
    return (
      <Container style={{ height: this.state.calcHeight }} ref={(ref) => { this.refDom = ref; }} className="table_container_fitable_wrap">
        {
          // eslint-disable-next-line
          React.Children.map(this.props.children, function (child) {
            return <div className="table_container_fitable">{child}</div>;
          })
        }
      </Container>
    );
  }
}

export default TableContainer;
