import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { DIMENSIONS } from '../util/dimensions';

const Container = styled.div({
  padding: '2.5rem 0.5rem',
  backgroundColor: '#222',
  position: 'relative',
});

const Title = styled.h1(
  {
    margin: 0,
    padding: 0,
    color: 'white',
    textAlign: 'center',
    fontSize: 48,
    ...DIMENSIONS.greaterThan('medium')({
      fontSize: 96,
    }),
  },
  ({ small }) => ({
    ...(small
      ? {
          fontSize: 32,
          ...DIMENSIONS.greaterThan('medium')({
            fontSize: 48,
          }),
        }
      : {}),
  })
);

const Subtitle = styled.h2({
  margin: 0,
  padding: 0,
  color: '#ddd',
  textAlign: 'center',
  fontSize: 32,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 48,
  }),
});

export default function Subheader({ small, subTitle, title }) {
  return (
    <Container>
      <Title small={small}>{title}</Title>
      {subTitle && <Subtitle>{subTitle}</Subtitle>}
    </Container>
  );
}

Subheader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
};

Subheader.defaultProps = {
  image: {},
};
