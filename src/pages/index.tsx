import React from "react"
import styled from "styled-components"
import Layout from "../global/Layout"
import theme from "@totallymoney/ui/theme"

import RepoHistory from "../components/RepoHistory"

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Heading = styled.h1`
  position: absolute;
  top: ${theme.spacingXS};
  font-family: ${theme.buenosAires};
  font-size: 8vw;
  color: ${theme.cloudyBlue};
  z-index: 100;
`

const IndexPage = () => (
  <Layout>
    <Page>
      <Heading>Totally Gordo</Heading>
      <RepoHistory />
    </Page>
  </Layout>
)

export default IndexPage
