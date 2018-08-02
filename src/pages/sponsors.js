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

const Link = styled(GatsbyLink)({
  color: 'inherit',
  textDecoration: 'none',
});

const GetInTouch = styled(GatsbyLink)({
  color: 'inherit',
});

/*
 * TODO: get images looking nicer
 */
export default function Sponsors({ data, ...rest }) {
  const { sponsors } = data;
  return (
    <Layout
      title="Sponsors"
      meta={[
        {
          name: 'description',
          content:
            'Midwest JS is a premier technology conference focused on the JavaScript ecosystem. Learn more about our invaluable sponsors, without which this conference would not be possible.',
        },
      ]}
      {...rest}
    >
      <Container>
        <Subheader title="Sponsors" />
        <Content>
          <Grid>
            {sponsors.edges.map(({ node: sponsor }) => (
              <Sponsor key={sponsor.name}>
                <Link to={sponsor.slug}>
                  <Image fixed={sponsor.logo.fixed} />
                </Link>
              </Sponsor>
            ))}
            <Sponsor
              css={{
                backgroundColor: '#222',
                color: 'white',
                borderRadius: 500,
                margin: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <GetInTouch to="/contact">
                <h3 css={{ fontSize: 40, margin: 0 }}>You?</h3>
                <h4 css={{ fontSize: 24, margin: 0 }}>Get in touch.</h4>
              </GetInTouch>
            </Sponsor>
          </Grid>
        </Content>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query SponsorsPageQuery {
    sponsors: allContentfulSponsor(sort: { fields: [name], order: ASC }) {
      edges {
        node {
          name
          slug
          description {
            childMarkdownRemark {
              html
            }
          }
          logo {
            fixed(width: 250) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
        }
      }
    }
  }
`;
