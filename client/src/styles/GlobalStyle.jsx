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

  .rws-green-btn,
  .rws-grey-btn {
    font-weight: 700;
    border-radius: 9999px;
    box-shadow: none;
    text-align: center;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    position: relative;
    color: #FFFFFF;
    &::before {
      opacity: 0;
      background-color: #FFFFFF !important;
      border-radius: inherit;
      bottom: 0;
      color: inherit;
      content: '';
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      transition: opacity .2s cubic-bezier(.4,0,.6,1);
    }
    &:hover {
      box-shadow: none;
      &::before {
        opacity: 0.08;
      }
    }
  }

  .rws-green-btn {
    &, &:hover {
      background-color: #496F46;
    }
  }

  .rws-grey-btn {
    &, &:hover {
      background-color: #BCBCBC;
    }
  }
`;

export default GlobalStyle;