const theme = require('./src/themes/default');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

let contentfulOptions = {};

if (process.env.CONTEXT === 'production') {
  contentfulOptions = {
    spaceId: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
    host: process.env.CONTENTFUL_HOST
  };
} else {
  contentfulOptions = {
    spaceId: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    host: process.env.CONTENTFUL_PREVIEW_HOST
  };
}

module.exports = {
  siteMetadata: {
    title: 'Noob Hustle',
    description:
      'An average dude figuring out how to build a side income online, and showing you everything along the way.',
    author: '@gatsbyjs',
    url: 'https://noobhustle.com',
    twitter: '@noobhustle'
  },
  plugins: [
    '@contentful/gatsby-transformer-contentful-richtext',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: []
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulOptions
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/nh-icon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        theme
      }
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'UA-135367724-1', // Google Analytics / GA
          'AW-759754651' // Google Ads / Adwords / AW
          //'DC-FLOODIGHT_ID' // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared accross all trackingIds
        gtagConfig: {
          optimize_id: 'OPT_CONTAINER_ID',
          anonymize_ip: true,
          cookie_expires: 0
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true
          // Avoids sending pageview hits from custom paths
          //exclude: ['/preview/**', '/do-not-track/me/too/']
        }
      }
    },
    {
      resolve: 'gatsby-plugin-lunr-search',
      options: {
        // Lunr reference
        ref: 'id',

        // Fields to be indexed
        fields: ['title'],

        // Nodes to be indexed
        resolvers: {
          // Index all `MarkdownRemark` nodes
          ContentfulBlogPost: {
            id: node => node.id,
            title: node => node.title
          }
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
