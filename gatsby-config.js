require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Annatou Studio's portfolio`,
    siteUrl: `https://anna-touvron.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-112916909-2",
        head: true,
      },
    },
  ],
}
