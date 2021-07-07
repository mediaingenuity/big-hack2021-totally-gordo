import { createGlobalStyle } from "styled-components"
import reset from "styled-reset-advanced"

export default createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    width: 100%;
  }

  body {
    max-width: 100%;
    font-size: 1.6rem;
    font-family: 'Source Sans Pro', Arial, sans-serif;
  }
`
