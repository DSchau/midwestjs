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

const PresentationContainer = styled.div();
const Presentation = styled.div();
const PresentationTitle = styled.h2({
  margin: 0,
  padding: 0,
  marginBottom: '0.5rem',
});
const PresentationDescription = styled.div({
  lineHeight: 1.5,
});

export default function SpeakerPage({ data, ...rest }) {
  const { speaker } = data;
  return (
    <Layout {...rest}>
      <Container>
        <Subheader title={speaker.name} />
        <Content>
          <Speaker featured={true} social={true} link={false} {...speaker}>
            <PresentationContainer>
              {(speaker.presentation || []).map(presentation => (
                <Presentation key={presentation.id}>
                  <PresentationTitle>{presentation.title}</PresentationTitle>
                  <PresentationDescription
                    dangerouslySetInnerHTML={{
                      __html: presentation.description.childMarkdownRemark.html,
                    }}
                  />
                </Presentation>
              ))}
            </PresentationContainer>
          </Speaker>
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SpeakerBySlugQuery($slug: String!) {
    speaker: contentfulSpeaker(slug: { eq: $slug }) {
      presentation {
        id
        title
        description {
          childMarkdownRemark {
            html
          }
        }
      }
      ...Speaker
    }
  }
`;
