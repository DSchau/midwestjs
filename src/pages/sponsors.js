import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export default function Sponsors({ data }) {
  const { speakers } = data;
  return (
    <Layout>
      <Container>
        <Subheader title="Sponsors" />
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SponsorsPageQuery {
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
