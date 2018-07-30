import React from 'react'
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import PageTitle from '../components/page-title';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

export default function Venue({ data }) {
  const { speakers } = data;
  return (
    <Layout>
      <Container>
        <PageTitle>Venue</PageTitle>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query VenuePageQuery {
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
