import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled.div({
  maxWidth: 900,
  margin: '1rem auto',
  padding: '1rem',
});

const Presentation = styled.div({
  display: 'flex',
  padding: '0.5rem 0',
});

const PresentationDate = styled.h2({
  margin: 0,
  padding: '0.25rem 0',
  margin: 0,
  marginBottom: '1rem',
  borderBottom: '2px solid #EEE',
  fontSize: 32,
});

const Title = styled.h2({
  margin: 0,
  padding: 0,
  fontWeight: 400,
  whiteSpace: 'nowrap',
  maxWidth: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 20,
});

const Room = styled(Title)({
  color: '#666',
});

const Time = styled.h2({
  margin: 0,
  padding: 0,
  fontWeight: 400,
  color: '#444',
  paddingRight: '1rem',
  whiteSpace: 'nowrap',
  fontSize: 20,
});

const Link = styled(GatsbyLink)({
  color: 'inherit',
  textDecoration: 'none',
});

const Image = styled(GatsbyImage)({
  marginLeft: '0.5rem',
});

export default function Schedule({ data, ...rest }) {
  const { presentations } = data;
  return (
    <Layout
      title="Schedule"
      meta={[
        {
          name: 'description',
          content:
            'Midwest JS is a premier technology conference focused on the JavaScript ecosystem. August 8th, 2018 will be workshop focused, and August 9th-10th will be multi-track presentations.',
        },
      ]}
      {...rest}
    >
      <Container>
        <Subheader title="Schedule" />
        <Content>
          {presentations.edges.map(({ node: presentation }, index) => {
            const prev = index === 0 ? {} : presentations.edges[index - 1].node;
            return (
              <React.Fragment key={presentation.id}>
                {presentation.day !== prev.day && (
                  <PresentationDate>{presentation.day}</PresentationDate>
                )}
                <Presentation key={presentation.id}>
                  {presentation.day !== prev.day ||
                  presentation.start !== prev.start ? (
                    <Time>{`${presentation.start} - ${presentation.end}`}</Time>
                  ) : null}
                  <div
                    css={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Link to={presentation.slug}>
                      <Title>{presentation.title}</Title>
                      <Room>{presentation.room.name}</Room>
                    </Link>
                    <div css={{ display: 'flex' }}>
                      {(presentation.speaker || []).map(speaker => (
                        <Link to={speaker.slug} key={speaker.id}>
                          <Image fixed={speaker.avatar.fixed} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Presentation>
              </React.Fragment>
            );
          })}
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SchedulePageQuery {
    presentations: allContentfulPresentation(
      sort: { fields: startTime, order: ASC }
    ) {
      edges {
        node {
          id
          title
          start: startTime(formatString: "hh:mm A")
          end: endTime(formatString: "hh:mm A")
          day: startTime(formatString: "dddd, MMMM Do")
          slug
          speaker {
            id
            avatar {
              fixed(height: 40, width: 40) {
                ...GatsbyContentfulFixed_withWebp
              }
            }
            name
            slug
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          room {
            name
          }
        }
      }
    }
  }
`;
