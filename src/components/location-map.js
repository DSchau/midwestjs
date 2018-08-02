import React from 'react';
import styled from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';

const Container = styled.div({
  lineHeight: 0,
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const Image = styled.img({
  width: '100%',
  height: 400,
  marginBottom: 0,
  objectFit: 'cover',
});

const Attribution = styled.span({
  position: 'relative',
  fontSize: 12,
  right: 10,
  bottom: 15,
  color: 'white',
  a: {
    color: 'white',
    textDecoration: 'none',
  },
});

export default function LocationMap({ coordinates, googleMapsUrl }) {
  const pinCoordinates = `${coordinates.longitude},${coordinates.latitude}`;
  const mapCoordinates = `${coordinates.longitude},${coordinates.latitude +
    0.0025}`;
  return (
    <StaticQuery
      query={graphql`
        query {
          apiKey: contentfulSecret(name: { eq: "Mapbox API Key" }) {
            value {
              value
            }
          }
        }
      `}
      render={data => (
        <Container>
          <a href={googleMapsUrl}>
            <Image
              src={`https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/pin-s(${pinCoordinates})/${mapCoordinates},12,0,0/800x200@2x?access_token=${
                data.apiKey.value.value
              }&logo=false&attribution=false`}
            />
          </a>
          <Attribution>
            &copy;
            <a href="https://www.mapbox.com/about/maps/">Mapbox </a>
            &copy;
            <a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>
            <strong>
              <a href="https://www.mapbox.com/map-feedback/" target="_blank">
                Improve this map
              </a>
            </strong>
          </Attribution>
        </Container>
      )}
    />
  );
}
