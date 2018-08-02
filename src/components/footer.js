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
  textAlign: 'center',
});

const ListItem = styled.li({
  display: 'inline-block',
  padding: 0,
  margin: '1rem',
  listStyleType: 'none',
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
  transition: '175ms ease-in-out',
  ':hover, &.active': {
    textDecoration: 'none',
  },
});

Link.defaultProps = {
  activeClassName: 'active',
  exact: true,
};

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
