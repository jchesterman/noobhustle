import Img from 'gatsby-image';
import React from 'react';
import styled from '@emotion/styled';
import {Link, StaticQuery, graphql} from 'gatsby';

const Logo = styled.div({
  width: '100%',
  maxWidth: '300px'
});

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        imageOne: file(relativePath: {eq: "noobhustle-logo.png"}) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <div
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: 1440,
            padding: '1.45rem 1.0875rem'
          }}
        >
          <Logo>
            <Link to="/">
              <Img fluid={data.imageOne.childImageSharp.fluid} />
            </Link>
          </Logo>
        </div>
      </>
    )}
  />
);

export default Header;
