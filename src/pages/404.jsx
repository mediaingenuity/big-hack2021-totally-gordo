import React from "react"
import styled from "styled-components"

import Layout from "../global/Layout"
import { Page } from "./index"

const Error = styled.span`
  font-size: 10vw;
  margin-bottom: 2vw;
`

const NotFoundPage = () => (
  <Layout>
    <Page>
      <Error role="img">⛔️</Error>
      <h1>NOT FOUND </h1>
    </Page>
  </Layout>
)

export default NotFoundPage
