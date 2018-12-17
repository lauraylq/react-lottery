import styled from 'styled-components';

const ToolbarContainer = styled.div`
  form {
    padding: 15px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
  }
  .ant-form-item {
    display: flex;
  }
  .ant-form-item-control-wrapper {
    flex: 1;
  }
  .ant-advanced-search-form .ant-form-item {
    margin-bottom: 10px;
  }
`;

export default ToolbarContainer;
