import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export default function IndexPage({ data }) {
  const { hero, speakers } = data;
  return (
    <Layout>
      <Subheader image={hero.image.fluid} title="Midwest JS 2018" />
      <Container />
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexPageQuery {
    hero: contentfulImage(name: { eq: "Hero" }) {
      image {
        fluid(maxWidth: 1000) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
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
