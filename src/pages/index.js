import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';

import Layout from '../components/layout';
import Speaker from '../components/speaker';

import { DIMENSIONS } from '../util/dimensions';

const Container = styled.main({
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

const Subtitle = styled.h2({
  margin: '1rem 0',
  padding: '1rem 0',
  textAlign: 'center',
  textTransform: 'uppercase',
  fontSize: 32,
  border: '4px solid #ffd503',
  borderLeftWidth: 0,
  borderRightWidth: 0,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 40,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 48,
  }),
});

const Section = styled.section({});

const Content = styled.div({
  maxWidth: 900,
  margin: '0 auto',
  padding: '1rem',
  textAlign: 'center',
});

const Paragraph = styled.p({
  margin: 0,
  padding: 0,
  lineHeight: 1.5,
  fontSize: 18,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 20,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 24,
  }),
});

const SectionLink = styled(CallToAction)({
  display: 'inline-block',
  backgroundColor: '#222',
  color: 'white',
  padding: '0.5rem 1rem',
  margin: '1rem 0',
  ':hover': {
    borderColor: '#222',
    backgroundColor: 'transparent',
    color: '#222',
  },
  fontSize: 14,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 16,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 20,
  }),
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

export default function IndexPage({ data, ...rest }) {
  const { hero, description, featured, speakers } = data;
  return (
    <Layout title="2018" {...rest}>
      <Container>
        <Hero>
          <Image fluid={hero.image.fluid} />
          <Details>
            <Title>Midwest JS 2018</Title>
            <Dates>August 8th - 10th</Dates>
            <Location>Minneapolis, MN</Location>
            <CallToAction to="/attend">Buy tickets</CallToAction>
          </Details>
        </Hero>
        <Section id="about">
          <Content>
            <Subtitle>We're back!</Subtitle>
            <Paragraph>{description.content}</Paragraph>
            <SectionLink to="/attend">Buy tickets</SectionLink>
          </Content>
        </Section>
        <Section id="speakers">
          <Content>
            <Subtitle>Speakers</Subtitle>
            {featured.edges.map(({ node: speaker }) => (
              <Speaker
                key={speaker.id}
                featured={true}
                showBio={false}
                {...speaker}
              />
            ))}
            <Grid>
              {speakers.edges.map(({ node: speaker }) => (
                <Speaker key={speaker.id} showBio={false} {...speaker} />
              ))}
            </Grid>
            <SectionLink to="/speakers">View all speakers</SectionLink>
          </Content>
        </Section>
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

    description: contentfulMetaTag(name: { eq: "description" }) {
      content
    }

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
      limit: 6
    ) {
      edges {
        node {
          ...Speaker
        }
      }
    }
  }
`;
