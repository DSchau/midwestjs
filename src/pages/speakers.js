import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

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

export default function Speakers({ data, ...rest }) {
  const { featured, speakers } = data;
  return (
    <Layout
      title="Speakers"
      meta={[
        {
          name: 'description',
          content:
            'Midwest JS is a premier technology conference focused on the JavaScript ecosystem. Learn more about our excellent speakers for this Minneapolis, MN conference.',
        },
      ]}
      {...rest}
    >
      <Container>
        <Subheader title="Speakers" />
        <Content>
          {featured.edges.map(({ node: speaker }) => (
            <Speaker key={speaker.id} featured={true} {...speaker} />
          ))}
          <Grid>
            {speakers.edges.map(({ node: speaker }) => (
              <Speaker key={speaker.id} {...speaker} />
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
      sort: { fields: [name], order: ASC }
    ) {
      edges {
        node {
          ...Speaker
        }
      }
    }

    speakers: allContentfulSpeaker(
      filter: { featured: { ne: true } }
      sort: { fields: [name], order: ASC }
    ) {
      edges {
        node {
          ...Speaker
        }
      }
    }
  }
`;
