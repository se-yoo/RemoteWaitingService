import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter' !important;
    letter-spacing: -0.05em !important;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  body {
    margin: 0px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .required::after {
    content: "*";
    color: #CA3737;
    display: inline-block;
    vertical-align: -webkit-baseline-middle;
    vertical-align: middle;
    padding-left: 4px;
  }
`;

export default GlobalStyle;