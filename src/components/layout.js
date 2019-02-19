import PropTypes from 'prop-types';
import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

import Footer from './footer';
import Header from './header';

const Layout = ({children}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto'
          }}
        >
          <main>{children}</main>
          <br />
          <br />
          <Footer />
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
