import React from 'react'
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import PageTitle from '../components/page-title';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

const Content = styled.div({
  maxWidth: 900,
  margin: '1rem auto',
  padding: '1rem'
});

export default function Conduct({ data }) {
  const { conduct } = data;
  return (
    <Layout>
      <Container>
        <PageTitle>{conduct.name}</PageTitle>
        <Content dangerouslySetInnerHTML={{ __html: conduct.content.childMarkdownRemark.html }} />
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ConductPageQuery {
    conduct:contentfulContent(name:{eq:"Code of Conduct"}) {
      content {
        childMarkdownRemark {
          html
        }
      }
      name
    }
  }
`;
