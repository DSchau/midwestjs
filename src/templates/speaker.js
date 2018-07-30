import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';
import Speaker from '../components/speaker';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled.div({
  margin: '0 auto',
  padding: '1rem',
  maxWidth: 960,
});

export default function SpeakerPage({ data }) {
  const { speaker } = data;
  return (
    <Layout>
      <Container>
        <Subheader title={speaker.name} />
        <Content>
          <Speaker {...speaker} />
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SpeakerBySlugQuery($slug: String!) {
    speaker: contentfulSpeaker(slug: { eq: $slug }) {
      ...Speaker
    }
  }
`;
