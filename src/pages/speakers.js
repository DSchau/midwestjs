import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

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

const Speaker = styled.div({
  padding: '1rem',
  margin: '0 auto',
});

const Name = styled.h2({
  margin: 0,
  marginTop: '0.5rem',
  padding: 0,
});

const Company = styled.h3({
  margin: 0,
  color: '#999',
});

const Bio = styled.div({
  fontSize: 14,
  margin: '1rem 0',
  lineHeight: 1.5,
});

const ImageContainer = styled.div({ textAlign: 'center' });
const Image = styled(GatsbyImage)();
const Link = styled(GatsbyLink)({
  textDecoration: 'none',
  color: 'inherit',
});

export default function Speakers({ data }) {
  const { speakers } = data;
  return (
    <Layout>
      <Container>
        <Subheader title="Speakers" />
        <Content>
          <Grid>
            {speakers.edges.map(({ node: speaker }) => (
              <Speaker key={speaker.id}>
                <Link to={speaker.slug}>
                  <ImageContainer>
                    <Image fixed={speaker.avatar.fixed} />
                  </ImageContainer>
                  <Name>{speaker.name}</Name>
                  {speaker.company && <Company>{speaker.company}</Company>}
                </Link>
                <Bio
                  dangerouslySetInnerHTML={{
                    __html: speaker.bio.childMarkdownRemark.html,
                  }}
                />
              </Speaker>
            ))}
          </Grid>
        </Content>
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
          avatar {
            fixed(height: 250, width: 250) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
          name
          company
          bio {
            childMarkdownRemark {
              html
            }
          }
          twitter
          github
          slug
        }
      }
    }
  }
`;
