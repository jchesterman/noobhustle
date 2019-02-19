import PropTypes from 'prop-types';
import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

import Footer from './footer';
import Header from './header';

const Layout = ({header, children}) => (
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
        {header && <Header siteTitle={data.site.siteMetadata.title} />}
        <div
          style={{
            margin: '0 auto'
          }}
        >
          <main>{children}</main>
          <Footer />
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool
};

Layout.defaultProps = {
  header: true
};

export default Layout;
