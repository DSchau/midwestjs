import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import Image from 'gatsby-image';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled.div({
  margin: '0 auto',
  padding: '1rem',
  maxWidth: 960,
});

const Bio = styled.div({
  margin: '2rem 0',
});

const Avatar = styled(Image)({
  margin: '0 auto',
  borderRadius: 250,
  maxWidth: 250,
});

export default function Speaker({ data }) {
  const { speaker } = data;
  return (
    <Layout>
      <Container>
        <Subheader title={speaker.name} />
        <Content>
          <Avatar sizes={speaker.avatar.sizes} />
          <Bio dangerouslySetInnerHTML={{ __html: speaker.bio.bio }} />
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SpeakerBySlugQuery($slug: String!) {
    speaker: contentfulSpeaker(slug: { eq: $slug }) {
      id
      name
      avatar {
        # TODO: use Gatsby GraphQL Fragment
        sizes(maxWidth: 250) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      company
      bio {
        bio
      }
      slug
      twitter
      github
    }
  }
`;
