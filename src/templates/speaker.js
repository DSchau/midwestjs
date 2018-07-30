import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import Image from 'gatsby-image';

import Layout from '../components/layout';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

const Header = styled.header({
  padding: '2.5rem 0.5rem',
  backgroundColor: '#222'
});

const Name = styled.h1({
  fontSize: 96,
  margin: 0,
  padding: 0,
  color: 'white',
  textAlign: 'center'
});

const Content = styled.div({
  margin: '0 auto',
  padding: '1rem',
  maxWidth: 960
});

const Bio = styled.div({
  margin: '2rem 0'
});

const Avatar = styled(Image)({
  margin: '0 auto',
  borderRadius: 250,
  maxWidth: 250
});

export default function Speaker({ data }) {
  const { speaker } = data;
  return (
    <Layout>
      <Container>
        <Header><Name>{speaker.name}</Name></Header>
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
    speaker:contentfulSpeaker(slug: { eq: $slug }) {
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
