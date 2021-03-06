import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

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

export default function Conduct({ data, ...rest }) {
  const { conduct } = data;
  return (
    <Layout
      title={conduct.name}
      meta={[
        {
          name: 'description',
          content:
            'Midwest JS is a premier technology conference focused on the JavaScript ecosystem. We are governed by a code of conduct, so please check this out to learn more about this code.',
        },
      ]}
      {...rest}
    >
      <Container>
        <Subheader title={conduct.name} />
        <Content
          dangerouslySetInnerHTML={{
            __html: conduct.content.childMarkdownRemark.html,
          }}
        />
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ConductPageQuery {
    conduct: contentfulContent(name: { eq: "Code of Conduct" }) {
      content {
        childMarkdownRemark {
          html
        }
      }
      name
    }
  }
`;
