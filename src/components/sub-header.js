import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';

import { DIMENSIONS } from '../util/dimensions';

const Container = styled.div(
  {
    padding: '2.5rem 0.5rem',
    backgroundColor: '#222',
    position: 'relative',
  },
  ({ image }) => ({
    ...(image
      ? {
          padding: 0,
        }
      : {}),
  })
);

const Name = styled.h1({
  fontSize: 48,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 96,
  }),
  margin: 0,
  padding: 0,
  color: 'white',
  textAlign: 'center',
});

const Image = styled(GatsbyImage)({
  position: 'absolute',
});

export default function Subheader({ image, title }) {
  return (
    <Container>
      <Image sizes={image} />
      <Name>{title}</Name>
    </Container>
  );
}

Subheader.propTypes = {
  image: PropTypes.shape({}),
  title: PropTypes.string.isRequired,
};

Subheader.defaultProps = {
  image: {},
};
