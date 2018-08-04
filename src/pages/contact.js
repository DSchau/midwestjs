import React from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';
import Tweet from '../components/tweet';

import { DIMENSIONS } from '../util/dimensions';

const Section = styled.section({
  maxWidth: 900,
  margin: '0 auto',
  padding: '1rem',
  textAlign: 'center',
});

const Title = styled.h2({
  margin: '1rem 0',
  padding: '1rem 0',
  textAlign: 'center',
  textTransform: 'uppercase',
  fontSize: 32,
  border: '4px solid #ffd503',
  borderLeftWidth: 0,
  borderRightWidth: 0,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 40,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 48,
  }),
});

const Paragraph = styled.p({
  margin: 0,
  padding: 0,
  lineHeight: 1.5,
  fontSize: 18,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 20,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 24,
  }),
});

const Link = styled.a({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#222',
  color: 'white',
  margin: '1rem 0',
  padding: '1rem 1.5rem',
  border: '2px solid transparent',
  transition: '175ms ease-in-out',
  textDecoration: 'none',
  textTransform: 'uppercase',
  ':hover': {
    borderColor: '#222',
    backgroundColor: 'transparent',
    color: '#222',
    svg: {
      color: '#222 !important',
    },
  },
  fontSize: 16,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 18,
  }),
  ...DIMENSIONS.greaterThan('large')({
    fontSize: 24,
  }),
});

Link.defaultProps = {
  target: '_blank',
  rel: 'noopener',
};

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '100%',
  gridRowGap: '1rem',
  gridColumnGap: '1rem',
  ...DIMENSIONS.greaterThan('medium')({
    gridTemplateColumns: '50% 50%',
  }),
});

export default function Contact({ data, ...rest }) {
  const { tweets } = data;
  return (
    <Layout title="Contact Us" {...rest}>
      <Subheader title="Contact Us" />
      <Section id="email">
        <Title>Email</Title>
        <Paragraph>
          Get in touch if you have any questions, or if we can help with
          anything!
        </Paragraph>
        <Link href="mailto:cory.tranby@gmail.com">Contact us</Link>
      </Section>
      <Section id="slack">
        <Title>Slack</Title>
        <Paragraph>
          We have a great MidwestJS Slack channel. Use the link below to request
          access, so you can discuss all the great talks and workshops!
        </Paragraph>
        <Link href="https://midwestjs-slack.herokuapp.com/">Join us</Link>
      </Section>
      <Section id="twitter">
        <Title>Twitter</Title>
        <Link href="https://twitter.com/midwest_js">Follow us</Link>
        <Grid>
          {tweets.edges.map(({ node: tweet }) => (
            <Tweet key={tweet.id_str} {...tweet} />
          ))}
        </Grid>
      </Section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ContactPageQuery {
    tweets: allTweet(limit: 6) {
      edges {
        node {
          ...TweetDetails
        }
      }
    }
  }
`;
