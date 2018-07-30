import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { injectGlobal } from 'emotion';

import 'sanitize.css';
import 'typeface-montserrat';

import Footer from './footer';
import Header from './header';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Montserrat, sans-serif',
});

/*
 * TODO: https://github.com/gatsbyjs/gatsby/issues/6337
 */
export default function Layout({ children, location, meta }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <Container>
          <Helmet meta={meta} />
          <Header location={location} />
          {children}
          <Footer />
        </Container>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  meta: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

Layout.defaultProps = {
  meta: [],
};

injectGlobal`
::selection {
  color: black;
  background: #ffd503;
}

::-moz-selection {
  color: black;
  background: #ffd503;
}
`;
