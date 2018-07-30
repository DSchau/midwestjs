import React from 'react'
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import PageTitle from '../components/page-title';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

export default function Sponsors({ data }) {
  const { speakers } = data;
  return (
    <Layout>
      <Container>
        <PageTitle>Sponsors</PageTitle>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SponsorsPageQuery {
    speakers:allContentfulSpeaker {
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
