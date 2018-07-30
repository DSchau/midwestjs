import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export default function IndexPage({ data }) {
  const { speakers } = data;
  return (
    <Layout>
      <Container />
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexPageQuery {
    speakers: allContentfulSpeaker {
      edges {
        node {
          id
          name
          company
          bio {
            bio
          }
          twitter
          github
        }
      }
    }
  }
`;
