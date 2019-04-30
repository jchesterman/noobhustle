import Footer from './footer';
import Header from './header';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import theme from '../themes/default';
import {Global, css} from '@emotion/core';
import {StaticQuery, graphql} from 'gatsby';

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
        <Helmet>
          <script src="//platform-api.sharethis.com/js/sharethis.js#property=5cb0a6ba918ee800121206ec&product=custom-share-buttons" />
        </Helmet>
        <Global
          styles={css`
            a {
              color: ${theme.palette.primary.main};
            }
          `}
        />
        {header && <Header siteTitle={data.site.siteMetadata.title} />}
        <div
          style={{
            margin: '0 auto'
          }}
        >
          <main style={{minHeight: '85vh'}}>{children}</main>
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
