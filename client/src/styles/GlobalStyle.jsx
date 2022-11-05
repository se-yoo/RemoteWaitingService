import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter' !important;
    letter-spacing: -0.05em !important;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .rws-green-btn {
    text-align: center;
    color: #FFFFFF;
    &, &:hover {
      background-color: #496F46;
    }
  }

  .rws-grey-btn {
    text-align: center;
    color: #FFFFFF;
    &, &:hover {
      background-color: #BCBCBC;
    }
  }

  .rws-green-btn,
  .rws-grey-btn {
    &::before {
      opacity: 0;
    }
    &:hover {
      box-shadow: none;
      &::before {
        background-color: #FFFFFF !important;
        border-radius: inherit;
        bottom: 0;
        color: inherit;
        content: '';
        left: 0;
        opacity: 0.08;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity .2s cubic-bezier(.4,0,.6,1);
      }
    }
  }
`;

export default GlobalStyle;