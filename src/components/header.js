import React from 'react';
import styled from 'react-emotion';
import { Link as GatsbyLink, StaticQuery, graphql } from 'gatsby';

const Header = styled.header({
  backgroundColor: '#222',
  padding: '1rem'
});

const Image = styled.img({
  filter: 'grayscale(1)',
  transition: '175ms ease-in-out',
  marginRight: '2rem',
  marginBottom: 0,
  ':hover': {
    filter: 'grayscale(0)'
  }
});

const Navigation = styled.nav({
  display: 'flex',
  alignItems: 'center',
});

const NavigationList = styled.ul({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: 0,
  padding: 0
});

const NavigationItem = styled.li({
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  listStyleType: 'none',
  marginBottom: 0,
  padding: 0,
  textTransform: 'uppercase'
});

const Link = styled(GatsbyLink)({
  color: 'white',
  padding: '0.5rem',
  textDecoration: 'none'
});

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
    color: '#ffd503'
  }
});

export default function HeaderComponent() {
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

          logo:file(relativePath: { eq: "logo.png" }) {
            transformed: childImageSharp {
              fixed(height: 48, width: 48) {
                src
              }
            }
          }
        }
      `}
      render={data => (
        <Header>
          <Navigation>
            <Link to="/"><Image src={data.logo.transformed.fixed.src} /></Link>
            <NavigationList>
              {data.site.siteMetadata.navigationItems.map(({ href, label }) => (
                <NavigationItem key={href}><Link to={href}>{label}</Link></NavigationItem>
              ))}
              <NavigationItem><AttendLink to="/attend">Attend</AttendLink></NavigationItem>
            </NavigationList>
          </Navigation>
        </Header>
      )}
    />

  );
}
