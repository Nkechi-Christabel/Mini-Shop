import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
     margin: 0;
     padding: 0;
     border: 0;
     font-size: 100%;
     font: inherit;
     vertical-align: baseline;
  }

  ol, ul {
     list-style: none;
 }

  blockquote, q {
     quotes: none;
 }

  blockquote:before, blockquote:after, q:before, q:after {
     content: '';
     content: none;
}

  table {
     border-collapse: collapse;
     border-spacing: 0;
}
 
*, *:after, *:before {
     box-sizing: border-box;
}

body, html {
  height: 100%;
}
   
  body {
    font-family: 'Raleway', sans-serif !important;
    color: #1D1F22;
    line-height: 1;
    letter-spacing: 1px;
    min-height: 100vh;
    }

  body::-webkit-scrollbar {
      width: .5rem;
    }

  body::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

    }

  body::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }

  a {
    text-decoration: none;
    color: #1D1F22;
  }

  button {
    border: none;
    background: none;
  }

  /* Utility classes */
  .container {
    max-width: 1200px;
   padding-left: 1.5rem;
   padding-right: 1.5rem;
    margin: 0 auto;
  }

  .text-primary {
    color: #5ECE7B;
  }

  .bg-primary {
    background-color: #5ECE7B;
  }

  .text-secondary {
    color: #1D1F22;
  }

  .bg-secondary {
    color: #1D1F22
  }

  .flex {
    display: flex;
  }

  .hidden {
    display: none;
  }

    .border-top {
    border-top: 1px solid #e5e5e5;
  }

  // .block {
  //   display: block;
  // }

  .relative {
    position: relative
  }

`;
