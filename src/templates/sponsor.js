import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

import { DIMENSIONS } from '../util/dimensions';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
});

const Content = styled.div({
  margin: '1rem auto',
  padding: '1rem',
  maxWidth: 960,
});

const Description = styled.div({
  lineHeight: 1.5,
  marginTop: '1rem',
  textAlign: 'left',
});

const CompanyLink = styled.a({
  display: 'inline-block',
  backgroundColor: '#222',
  color: 'white',
  padding: '0.5rem 1.5rem',
  margin: '2rem 0',
  border: '2px solid transparent',
  transition: '175ms ease-in-out',
  textDecoration: 'none',
  ':hover': {
    borderColor: '#222',
    backgroundColor: 'transparent',
    color: '#222',
  },
});

const Image = styled(GatsbyImage)();

export default function SponsorPage({ data, ...rest }) {
  const { sponsor } = data;
  return (
    <Layout title={`Sponsors | ${sponsor.name}`} {...rest}>
      <Container>
        <Subheader title={sponsor.name} small={true} />
        <Content>
          <Image fixed={sponsor.logo.fixed} />
          <Description
            dangerouslySetInnerHTML={{
              __html: sponsor.description.childMarkdownRemark.html,
            }}
          />
          <CompanyLink href={sponsor.url} target="_blank" rel="noopener">
            Learn more
          </CompanyLink>
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SponsorBySlugQuery($slug: String!) {
    sponsor: contentfulSponsor(slug: { eq: $slug }) {
      name
      description {
        childMarkdownRemark {
          html
        }
      }
      url
      logo {
        fixed(width: 300) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
    }
  }
`;
