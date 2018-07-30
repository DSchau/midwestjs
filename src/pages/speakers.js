import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export default function Speakers({ data }) {
  const { speakers } = data;
  return (
    <Layout>
      <Container>
        <Subheader title="Speakers" />
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SpeakersPageQuery {
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
