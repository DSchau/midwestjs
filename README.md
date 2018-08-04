# midwestjs

[![Hosted Version](./demo/demo.jpg)](https://midwestjs.netlify.com)

A Gatsby-generated variant of [midwestjs][midwestjs], currently hosted using [Netlify][netlify]

## Content

All content is hosted and created using [Contentful][contentful], and then queried and injected using [gatsby-source-contentful][gatsby-source-contentful]. All content on the side, including images, speakers, presentations, etc. are driven and derived from this Contentful content base.

## Gatsby

Gatsby, a static site generator for React, is used as the engine powering the static site generation and data/content injection layer. Particularly noteworthy files/techniques can be found in the following files:

- [Querying contentful nodes](./src/pages/index.js#L214-250)
- [Querying Twitter for recent tweets](./src/pages/contact.js#L125-135)

[midwestjs]: https://midwestjs.com
[netlify]: https://netlify.com
[contentful]: https://contentful.com
[gatsby-source-contentful]: https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-contentful
