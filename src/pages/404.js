import React from 'react';

import Layout from '../components/layout';
import Subheader from '../components/sub-header';

export default function FourOhFour(props) {
  return (
    <Layout title="Not Found" {...props}>
      <Subheader title="That's a no go..." />
      <h1>404: Not Found</h1>
    </Layout>
  );
}
