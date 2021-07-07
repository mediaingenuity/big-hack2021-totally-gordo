import React from "react"
import styled from "styled-components"
import theme from "@totallymoney/ui/theme"

const LayoutWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background-color: ${theme.graphiteLight};
`

const Layout = ({ children }) => <LayoutWrap>{children}</LayoutWrap>

export default Layout
