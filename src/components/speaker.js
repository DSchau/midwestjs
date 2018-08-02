import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';
import { FaGithubSquare, FaTwitterSquare } from 'react-icons/fa';

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  margin: '1rem auto',
  width: '100%',
});

const Container = styled.div({}, ({ featured }) => ({
  ...(featured
    ? {
        border: '4px solid #EEE',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: '1rem 0',
        margin: '1rem 0',
      }
    : {}),
}));

const Name = styled.h2({
  margin: 0,
  marginTop: '0.5rem',
  padding: 0,
});

const Company = styled.h3({
  margin: 0,
  color: '#999',
});

const Bio = styled.div({
  fontSize: 14,
  margin: '1rem 0',
  lineHeight: 1.5,
});

const ImageContainer = styled.div({ textAlign: 'center' });
const Details = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const Social = styled.div({
  display: 'flex',
});
const A = styled.a({
  color: 'inherit',
  textDecoration: 'none',
});

A.defaultProps = {
  target: '_blank',
  rel: 'noopener',
};

const Image = styled(GatsbyImage)();
const Link = styled(GatsbyLink)({
  display: 'block',
  color: 'inherit',
  textDecorationSkip: 'ink',
  width: '100%',
});

export default function Speaker({
  id,
  children,
  slug,
  avatar,
  name,
  company,
  bio,
  github,
  twitter,
  link,
  social,
  featured,
  showBio,
}) {
  const Wrapper = link ? Link : React.Fragment;
  return (
    <Root>
      <Container key={id} featured={featured}>
        <ImageContainer>
          <Image fixed={avatar.fixed} />
        </ImageContainer>
        <Details>
          <Wrapper {...(link ? { to: slug } : {})}>
            <div>
              <Name>{name}</Name>
              {company && <Company>{company}</Company>}
            </div>
          </Wrapper>
          {social && (
            <Social>
              {twitter && (
                <A
                  css={{
                    padding: '0.5rem',
                    color: '#999',
                    transition: '175ms ease-in-out',
                    ':hover': { color: '#1da1f2' },
                  }}
                  href={twitter}
                >
                  <FaTwitterSquare size={32} />
                </A>
              )}
              {github && (
                <A
                  css={{
                    padding: '0.5rem',
                    color: '#999',
                    transition: '175ms ease-in-out',
                    ':hover': { color: '#333' },
                  }}
                  href={github}
                >
                  <FaGithubSquare size={32} />
                </A>
              )}
            </Social>
          )}
        </Details>
        {showBio && (
          <Bio
            dangerouslySetInnerHTML={{
              __html: featured
                ? bio.childMarkdownRemark.html
                : bio.childMarkdownRemark.excerpt,
            }}
          />
        )}
      </Container>
      {children}
    </Root>
  );
}

Speaker.defaultProps = {
  showBio: true,
  link: true,
};

export const speakerFragment = graphql`
  fragment Speaker on ContentfulSpeaker {
    id
    avatar {
      fixed(height: 250, width: 250) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    name
    company
    bio {
      childMarkdownRemark {
        excerpt(pruneLength: 150)
        html
      }
    }
    twitter
    github
    slug
  }
`;
