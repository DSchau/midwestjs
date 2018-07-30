import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';

import Layout from '../components/layout';

import { DIMENSIONS } from '../util/dimensions';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Hero = styled.div({
  position: 'relative',
});

const Image = styled(GatsbyImage)({});

const Details = styled.div({
  backgroundColor: 'black',
  padding: '2rem',
  ...DIMENSIONS.greaterThan('medium')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    transform: 'translateY(-60%) translateX(-50%)',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  }),
});

const Title = styled.h1({
  margin: 0,
  marginBottom: '1rem',
  padding: 0,
  color: 'white',
  textTransform: 'uppercase',
  fontSize: 28,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 40,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 72,
  }),
});

const Dates = styled.h2({
  margin: 0,
  marginBottom: '0.5rem',
  padding: 0,
  color: 'white',
  fontSize: 18,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 24,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 40,
  }),
});

const Location = styled(Dates)({
  marginBottom: '2rem',
  fontSize: 16,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 22,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 32,
  }),
});

const CallToAction = styled(GatsbyLink)({
  backgroundColor: '#ffd503',
  color: '#222',
  padding: '1rem 1.5rem',
  border: '2px solid transparent',
  transition: '175ms ease-in-out',
  textDecoration: 'none',
  textTransform: 'uppercase',
  margin: '2rem 0',
  ':hover': {
    borderColor: '#ffd503',
    backgroundColor: 'transparent',
    color: '#ffd503',
  },
  fontSize: 16,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 18,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 24,
  }),
});

export default function IndexPage({ data, ...rest }) {
  const { hero, speakers } = data;
  return (
    <Layout {...rest}>
      <Container>
        <Hero>
          <Image fluid={hero.image.fluid} />
          <Details>
            <Title>Midwest JS 2018</Title>
            <Dates>August 8th - 10th</Dates>
            <Location>Minneapolis, MN</Location>
            <CallToAction to="/attend">Buy your tickets</CallToAction>
          </Details>
        </Hero>
      </Container>
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
