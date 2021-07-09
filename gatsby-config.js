module.exports = {
  siteMetadata: {
    title: "Totally Gordo",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TotallyMoney`,
        short_name: `TotallyMoney`,
        start_url: `/`,
        lang: `en`,
        background_color: `#0F0A3A`,
        theme_color: `#0F0A3A`,
        display: `minimal-ui`,
        icon: `src/assets/logos/favicon.ico`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/`,
        name: "src",
      },
    },
    "gatsby-plugin-root-import",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-use-query-params",
  ],
}
