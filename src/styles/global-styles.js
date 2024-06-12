// src/styles/global-styles.js
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @import url("https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css");


  body {
    margin: 0;
    padding: 0;
    font-family: 'Galmuri11', sans-serif;
    background-color: #f2f2f2;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Galmuri11', sans-serif;
  }
`;

export default GlobalStyle;
