import React from 'react';
import styled from 'react-emotion';
import { Link as GatsbyLink, StaticQuery, graphql } from 'gatsby';

const Footer = styled.footer({
  backgroundColor: '#ffd503',
  padding: '2rem 1rem',
  paddingBottom: '0.5rem',
});

const List = styled.ul({
  display: 'block',
  padding: 0,
  margin: 0,
});

const ListItem = styled.li({
  display: 'block',
  padding: 0,
  margin: '1rem 0',
  listStyleType: 'none',
});

const Title = styled.h2({
  color: 'black',
  margin: 0,
  marginBottom: '1rem',
  textTransform: 'uppercase',
});

const Copyright = styled.p({
  textAlign: 'center',
  margin: 0,
  padding: '0.5rem 0',
});

const Link = styled(GatsbyLink)({
  color: 'black',
  fontSize: 18,
  textDecorationSkip: 'ink',
});

export default function FooterComponent() {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              navigationItems {
                href
                label
              }
            }
          }
        }
      `}
      render={data => (
        <Footer>
          <Title>Event details</Title>
          <List>
            {data.site.siteMetadata.navigationItems.map(({ href, label }) => (
              <ListItem key={href}>
                <Link to={href}>{label}</Link>
              </ListItem>
            ))}
          </List>
          <Copyright>
            Copyright &copy; Midwest JS {new Date().getFullYear()}
          </Copyright>
        </Footer>
      )}
    />
  );
}
