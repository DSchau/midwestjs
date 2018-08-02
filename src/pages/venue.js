import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import Image from 'gatsby-image';

import Layout from '../components/layout';
import LocationMap from '../components/location-map';
import Subheader from '../components/sub-header';

import { DIMENSIONS } from '../util/dimensions';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled.div({
  width: '100%',
  maxWidth: 900,
  margin: '1rem auto',
  padding: '1rem',
});

const Title = styled.h2({
  margin: '1rem 0',
  padding: '0.25rem 0',
  borderBottom: '2px solid #EEE',
  fontSize: 20,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 24,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 32,
  }),
});

const Paragraph = styled.p({
  margin: 0,
  padding: 0,
  lineHeight: 1.5,
});

const Link = styled.a({
  color: 'inherit',
});

Link.defaultProps = {
  target: '_blank',
  rel: 'noopener',
};

export default function Venue({ data, ...rest }) {
  const { venue } = data;
  return (
    <Layout title="Venue" {...rest}>
      <Container>
        <Subheader title="Venue" />
        <Content>
          <Title>University of St Thomas - Schulze Hall</Title>
          <Paragraph>
            <Link href="https://www.stthomas.edu/business/visitors/campuses/">
              Schulz Hall
            </Link>
          </Paragraph>
          <Paragraph>46 11th Street South, Minneapolis, MN 55403</Paragraph>
          <Image fluid={venue.image.fluid} />
          <LocationMap
            coordinates={{ latitude: 44.974167, longitude: -93.2777274 }}
            googleMapsUrl="https://goo.gl/maps/jdvRb7XixXx"
          />
          <Title>Parking</Title>
          <Paragraph>
            <Link href="https://www.mplsparking.com/off-street">
              11th & Harmon Ramp
            </Link>
          </Paragraph>
          <Paragraph>25 South 11th Street, Minneapolis, MN 55403</Paragraph>
          <Title>Hotel</Title>
          <Paragraph>
            <Link href="http://group.doubletree.com/scmf/OrMCe04Lcp0lOEE3-0M7rxML2k59QURMEHE8SZ2-OtRp7UdPezw80ZSIRkp6P5TJxfQiUme7oEoKFyWshcY-tGoVJLJk3TlT6u0Nsauu1Dsxg25tWe9Wyx_DeFFOC0ft2sNZe04L/midwestjs-attendees2018">
              Doubletree Suites
            </Link>
          </Paragraph>
          <Paragraph>
            1101 LaSalle Avenue, Minneapolis, Minnesota, 55403
          </Paragraph>
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query VenuePageQuery {
    venue: contentfulImage(name: { eq: "Venue" }) {
      image {
        fluid(maxWidth: 600) {
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
