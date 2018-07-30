import React from 'react'
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import PageTitle from '../components/page-title';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

export default function Schedule({ data }) {
  const { speakers } = data;
  return (
    <Layout>
      <Container>
        <PageTitle>Schedule</PageTitle>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SchedulePageQuery {
    speakers:allContentfulSpeaker {
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
