import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';

import 'sanitize.css';
import 'typeface-montserrat';

import Footer from './footer';
import Header from './header';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Montserrat, sans-serif'
});

/*
 * TODO: https://github.com/gatsbyjs/gatsby/issues/6337
 */
export default function Layout({ children }) {
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
          <Helmet
            meta={[
              { name: 'description', content: '1234' }
            ]}
          />
          <Header />
          {children}
          <Footer />
        </Container>
      )}
    />
  );
}
