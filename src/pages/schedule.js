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
  width: '100%',
  maxWidth: 900,
  margin: '1rem auto',
  padding: '1rem',
});

const Presentation = styled.div({
  display: 'flex',
  padding: '0.5rem 0',
  width: '100%',
});

const PresentationDate = styled.h2({
  margin: 0,
  padding: '0.25rem 0',
  marginBottom: '1rem',
  borderBottom: '2px solid #EEE',
  fontSize: 20,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 24,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 32,
  }),
});

const Title = styled.h2({
  margin: 0,
  padding: 0,
  fontWeight: 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#444',
  fontSize: 12,
  maxWidth: 200,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 16,
    maxWidth: 350,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 20,
    maxWidth: 500,
  }),
});

const Room = styled(Title)({
  color: '#666',
});

const Time = styled.h2({
  margin: 0,
  padding: 0,
  fontWeight: 400,
  paddingRight: '1rem',
  whiteSpace: 'nowrap',
  fontSize: 12,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 16,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 20,
  }),
});

const Spacer = styled(Time)({
  visibility: 'hidden',
});

const Link = styled(GatsbyLink)({
  color: 'inherit',
});

const Images = styled.div({
  display: 'none',
  ...DIMENSIONS.greaterThan('large')({
    display: 'flex',
  }),
});

const SpeakerImage = styled(GatsbyImage)({
  marginLeft: '0.5rem',
  transition: '175ms ease-in-out',
  ':hover': {
    transform: 'scale(1.1)',
  },
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
            const TimeWrapper =
              presentation.day !== prev.day || presentation.start !== prev.start
                ? Time
                : Spacer;
            return (
              <React.Fragment key={presentation.id}>
                {presentation.day !== prev.day && (
                  <PresentationDate>{presentation.day}</PresentationDate>
                )}
                <Presentation>
                  <TimeWrapper>{`${presentation.start} - ${
                    presentation.end
                  }`}</TimeWrapper>
                  <div
                    css={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Link to={presentation.slug}>
                      <Title title={presentation.title}>
                        {presentation.title}
                      </Title>
                      <Room>{presentation.room.name}</Room>
                    </Link>
                    <Images>
                      {(presentation.speaker || []).map(speaker => (
                        <Link to={speaker.slug} key={speaker.id}>
                          <SpeakerImage fixed={speaker.avatar.fixed} />
                        </Link>
                      ))}
                    </Images>
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
      sort: { fields: [startTime, room___NODE], order: ASC }
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
