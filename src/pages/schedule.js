import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';
import format from 'date-fns/format';
import addHours from 'date-fns/add_hours';

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
});

const Title = styled.h2({
  margin: 0,
  padding: 0,
});

const Time = styled.h2({
  margin: 0,
  padding: 0,
  color: '#444',
  paddingRight: '2rem',
});

const Link = styled(GatsbyLink)({
  color: 'inherit',
  textDecoration: 'none',
});
const Image = styled(GatsbyImage)();

const getEndDate = dateTime => addHours(new Date(dateTime), 1);
const formatTime = dateTime => format(new Date(dateTime), 'hh:mm A');

export default function Schedule({ data, ...rest }) {
  const { presentations } = data;
  console.log(presentations);
  return (
    <Layout {...rest}>
      <Container>
        <Subheader title="Schedule" />
        <Content>
          {presentations.edges.map(({ node: presentation }) => (
            <Presentation key={presentation.id}>
              <Time>
                {formatTime(presentation.time)} -{' '}
                {formatTime(getEndDate(presentation.time))}
              </Time>
              <React.Fragment>
                <Link to={presentation.slug}><Title>{presentation.title}</Title></Link>
              </React.Fragment>
              {(presentation.speaker || []).map(speaker => (
                <Link to={speaker.slug} key={speaker.id}>
                  <Image fixed={speaker.avatar.fixed} />
                </Link>
              ))}
            </Presentation>
          ))}
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SchedulePageQuery {
    presentations: allContentfulPresentation(
      sort: { fields: time, order: ASC }
    ) {
      edges {
        node {
          id
          title
          time
          slug
          speaker {
            id
            avatar {
              fixed(height: 50, width: 50) {
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
