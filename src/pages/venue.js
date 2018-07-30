import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export default function Venue({ data, ...rest }) {
  return (
    <Layout title="Venue" {...rest}>
      <Container>
        <Subheader title="Venue" />
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query VenuePageQuery {
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
