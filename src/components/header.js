import React from 'react';
import styled from 'react-emotion';
import { Link as GatsbyLink, StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';

const Header = styled.header({
  backgroundColor: '#222',
});

const Subheader = styled.div({
  backgroundColor: '#ffd503',
  padding: '0.5rem 1rem',
});

const EventMessage = styled.p({
  color: 'black',
  fontSize: 14,
  margin: 0,
  padding: 0,
  textAlign: 'center',
  textTransform: 'uppercase',
});

const Image = styled(GatsbyImage)({
  filter: 'grayscale(1)',
  transition: '175ms ease-in-out',
  marginRight: '2rem',
  marginBottom: 0,
  ':hover, .active &': {
    filter: 'grayscale(0)',
  },
});

const Navigation = styled.nav({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
});

const NavigationList = styled.ul({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: 0,
  padding: 0,
});

const NavigationItem = styled.li({
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  listStyleType: 'none',
  marginBottom: 0,
  padding: 0,
  textTransform: 'uppercase',
});

const IndexLink = styled(GatsbyLink)({
  textDecoration: 'none',
});

IndexLink.defaultProps = {
  activeClassName: 'active',
  exact: true,
};

const Link = styled(IndexLink)({
  color: 'white',
  padding: '0.5rem',
  textDecoration: 'none',
  borderBottom: '2px solid transparent',
  transition: '175ms ease-in-out',
  ':hover': {
    borderBottomColor: '#999',
  },
  '&.active': {
    borderBottomColor: '#eee',
  },
});

Link.defaultProps = {
  activeClassName: 'active',
  exact: true,
};

const AttendLink = styled(GatsbyLink)({
  backgroundColor: '#ffd503',
  color: '#222',
  padding: '1rem 1.5rem',
  border: '2px solid transparent',
  transition: '175ms ease-in-out',
  textDecoration: 'none',
  ':hover': {
    borderColor: '#ffd503',
    backgroundColor: 'transparent',
    color: '#ffd503',
  },
});

export default function HeaderComponent({ location }) {
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

          logo: contentfulImage(name: { eq: "Logo" }) {
            image {
              fixed(height: 48, width: 48) {
                ...GatsbyContentfulFixed
              }
            }
          }
        }
      `}
      render={data => (
        <Header>
          {location.pathname === '/' && (
            <Subheader>
              <EventMessage>
                Join us in Minneapolis, MN on 8/8 - 8/10!
              </EventMessage>
            </Subheader>
          )}
          <Navigation>
            <IndexLink to="/">
              <Image fixed={data.logo.image.fixed} />
            </IndexLink>
            <NavigationList>
              {data.site.siteMetadata.navigationItems.map(({ href, label }) => (
                <NavigationItem key={href}>
                  <Link to={href} exact={label !== 'Speakers'}>
                    {label}
                  </Link>
                </NavigationItem>
              ))}
              <NavigationItem>
                <AttendLink to="/attend">Attend</AttendLink>
              </NavigationItem>
            </NavigationList>
          </Navigation>
        </Header>
      )}
    />
  );
}
