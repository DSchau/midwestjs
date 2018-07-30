const path = require('path');

require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'MidwestJS',
    navigationItems: [
      {
        href: '/schedule',
        label: 'Schedule'
      },
      {
        href: '/speakers',
        label: 'Speakers'
      },
      {
        href: '/venue',
        label: 'Venue'
      },
      {
        href: '/sponsors',
        label: 'Sponsors'
      },
      {
        href: '/conduct',
        label: 'Conduct'
      }
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/util/typography',
        omitGoogleFont: true
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {}
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve('content/images'),
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
  ],
}
