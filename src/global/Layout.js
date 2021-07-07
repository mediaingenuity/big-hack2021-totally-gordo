import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

import GlobalStyle from "./GlobalStyle"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <link
            crossorigin
            rel="stylesheet"
            type="text/css"
            href="https://d3tbpaf5tfzpa.cloudfront.net/source-sans-pro.css"
          />
          <link rel="stylesheet" type="text/css" href="css/buenosaires.css" />
        </Helmet>
        <GlobalStyle />
        <>{children}</>
      </>
    )}
  />
)

export default Layout
