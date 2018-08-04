import React from 'react';
import styled from 'react-emotion';
import { graphql } from 'gatsby';

const Container = styled.div({
  display: 'flex',
  backgroundColor: 'white',
  padding: '1rem',
  border: '1px solid #eee',
});

const Image = styled.img({
  alignSelf: 'flex-start',
  marginRight: '1rem',
  minWidth: 48,
  borderRadius: 100,
});

const Details = styled.div({
  textAlign: 'left',
});

const User = styled.h3({
  margin: 0,
  padding: 0,
  color: '#222',
});

const Text = styled.p({
  margin: 0,
  padding: 0,
  lineHeight: 1.5,
  color: '#444',
});

export default function Tweet({ user, text }) {
  return (
    <Container>
      <Image src={user.profile_image_url} />
      <Details>
        <User>{user.name}</User>
        <Text>{text}</Text>
      </Details>
    </Container>
  );
}

export const tweetFragment = graphql`
  fragment TweetDetails on Tweet {
    id_str
    created_at
    text: full_text
    favorite_count
    retweet_count
    user {
      name
      screen_name
      profile_image_url: profile_image_url_https
    }
  }
`;
