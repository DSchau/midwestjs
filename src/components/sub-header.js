import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { DIMENSIONS } from '../util/dimensions';

const Container = styled.div({
  padding: '2.5rem 0.5rem',
  backgroundColor: '#222',
  position: 'relative',
});

const Title = styled.h1({
  fontSize: 48,
  ...DIMENSIONS.greaterThan('medium')({
    fontSize: 96,
  }),
  margin: 0,
  padding: 0,
  color: 'white',
  textAlign: 'center',
});

export default function Subheader({ title }) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

Subheader.propTypes = {
  title: PropTypes.string.isRequired,
};

Subheader.defaultProps = {
  image: {},
};
