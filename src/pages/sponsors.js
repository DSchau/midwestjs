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
});

const Content = styled.div({
  maxWidth: 900,
  margin: '1rem auto',
  padding: '1rem',
});

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '100%',
  ...DIMENSIONS.greaterThan('medium')({
    gridTemplateColumns: '50% 50%',
  }),
  ...DIMENSIONS.greaterThan('large')({
    gridTemplateColumns: '33% 33% 33%',
  }),
});

const Sponsor = styled.div({
  padding: '2rem',
});

const Image = styled(GatsbyImage)({
  filter: 'grayscale(1)',
  transition: '175ms ease-in-out',
  minWidth: 250,
  minHeight: 250,
  ':hover': {
    filter: 'grayscale(0)',
  },
});

/*
 * TODO: get images looking nicer
 */
export default function Sponsors({ data, ...rest }) {
  const { sponsors } = data;
  return (
    <Layout {...rest}>
      <Container>
        <Subheader title="Sponsors" />
        <Content>
          <Grid>
            {sponsors.edges.map(({ node }) => (
              <Sponsor key={node.name}>
                <Image fluid={node.logo.fluid} />
              </Sponsor>
            ))}
          </Grid>
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SponsorsPageQuery {
    sponsors: allContentfulSponsor {
      edges {
        node {
          name
          description {
            childMarkdownRemark {
              html
            }
          }
          logo {
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
