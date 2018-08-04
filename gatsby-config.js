const path = require('path');

require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Midwest JS',
    navigationItems: [
      {
        href: '/schedule',
        label: 'Schedule',
      },
      {
        href: '/speakers',
        label: 'Speakers',
      },
      {
        href: '/sponsors',
        label: 'Sponsors',
      },
      {
        href: '/conduct',
        label: 'Conduct',
      },
      {
        href: '/contact',
        label: 'Contact Us',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/util/typography',
        omitGoogleFont: true,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {},
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve('content/images'),
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-source-twitter',
      options: {
        q: `@Midwest_JS`,
        credentials: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          bearer_token: process.env.TWITTER_BEARER_TOKEN,
        },
        tweet_mode: 'extended',
      },
    },
  ],
};
