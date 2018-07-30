import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';
import Speaker from '../components/speaker';

import { DIMENSIONS } from '../util/dimensions';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled.div({
  maxWidth: 900,
  margin: '1rem auto',
  padding: '1rem',
});

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '100%',
  ...DIMENSIONS.greaterThan('medium')({
    gridTemplateColumns: '50% 50%',
  }),
  ...DIMENSIONS.greaterThan('large')({
    gridTemplateColumns: '33% 33% 33%',
  }),
});

export default function Speakers({ data }) {
  const { featured, speakers } = data;
  return (
    <Layout>
      <Container>
        <Subheader title="Speakers" />
        <Content>
          {featured.edges.map(({ node: speaker }) => (
            <Speaker key={speaker.id} {...speaker} />
          ))}
          <Grid>
            {speakers.edges.map(({ node: speaker }) => (
              <Speaker key={speaker.id} simple={true} {...speaker} />
            ))}
          </Grid>
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SpeakersPageQuery {
    featured: allContentfulSpeaker(
      filter: { featured: { eq: true } }
      sort: { fields: [featured, name], order: ASC }
    ) {
      edges {
        node {
          ...Speaker
        }
      }
    }

    speakers: allContentfulSpeaker(
      filter: { featured: { ne: true } }
      sort: { fields: [featured, name], order: ASC }
    ) {
      edges {
        node {
          ...Speaker
        }
      }
    }
  }
`;
