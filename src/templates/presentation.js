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
  margin: '0 auto',
  padding: '1rem',
  maxWidth: 960,
});

const Time = styled.h2({
  margin: 0,
  padding: 0,
  marginBottom: '0.5rem',
  textAlign: 'center',
  fontSize: 24,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 32,
  }),
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 40,
  }),
});
const Location = styled.h3({
  margin: 0,
  padding: 0,
  color: '#666',
  textAlign: 'center',
});
const Description = styled.div({
  lineHeight: 1.5,
  marginTop: '1rem',
});

const Speakers = styled.div({
  display: 'flex',
  flexDirection: 'column',
  ...DIMENSIONS.greaterThan('large')({
    flexDirection: 'row',
  }),
});

export default function PresentationPage({ data, ...rest }) {
  const { presentation } = data;
  return (
    <Layout {...rest}>
      <Container>
        <Subheader title={presentation.title} small={true} />
        <Content>
          <Time>{presentation.time}</Time>
          <Location>{presentation.room.name}</Location>
          <Description
            dangerouslySetInnerHTML={{
              __html: presentation.description.childMarkdownRemark.html,
            }}
          />
          <Speakers>
            {presentation.speaker.map(speaker => (
              <Speaker featured={true} {...speaker} />
            ))}
          </Speakers>
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PresentationBySlugQuery($slug: String!) {
    presentation: contentfulPresentation(slug: { eq: $slug }) {
      id
      title
      time(formatString: "MMMM Do - h:m A")
      description {
        childMarkdownRemark {
          html
        }
      }
      room {
        name
      }
      speaker {
        ...Speaker
      }
    }
  }
`;
