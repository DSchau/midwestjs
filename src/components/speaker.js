import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import styled from 'react-emotion';
import GatsbyImage from 'gatsby-image';

const Container = styled.div({
  padding: '0.5rem 1rem',
  margin: '0 auto',
});

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
const Image = styled(GatsbyImage)();
const Link = styled(GatsbyLink)({
  textDecoration: 'none',
  color: 'inherit',
});

export default function Speaker({
  id,
  slug,
  avatar,
  name,
  company,
  bio,
  simple,
}) {
  return (
    <Container key={id}>
      <Link to={slug}>
        <ImageContainer>
          <Image fixed={avatar.fixed} />
        </ImageContainer>
        <Name>{name}</Name>
        {company && <Company>{company}</Company>}
      </Link>
      <Bio
        dangerouslySetInnerHTML={{
          __html: simple
            ? bio.childMarkdownRemark.excerpt
            : bio.childMarkdownRemark.html,
        }}
      />
    </Container>
  );
}

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
