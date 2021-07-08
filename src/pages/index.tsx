import styled from "styled-components"

import Layout from "../global/Layout"
import Img from "../components/Image"
import theme from "@totallymoney/ui/theme"

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Image = styled(Img)`
  position: absolute;
`

const Heading = styled.h1`
  position: absolute;
  font-family: ${theme.buenosAires};
  font-size: 120px;
  color: ${theme.cloudyBlue};
  text-shadow: 1px 1px 1px ${theme.indigo30};
`
const IndexPage = () => (
  <Layout>
    <Page>
      <Image />
      <Heading>Totally Gordo</Heading>
    </Page>
  </Layout>
)

export default IndexPage
