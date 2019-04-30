import Hidden from '@material-ui/core/Hidden';
import Img from 'gatsby-image';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import theme from '../themes/default';
import withProps from 'recompose/withProps';
import {Link, StaticQuery, graphql} from 'gatsby';

const Logo = styled.div({
  width: '100%',
  maxWidth: '200px'
});

const MainMenu = styled.div({
  float: 'right',
  display: 'flex'
});

const MainMenuItem = withProps({
  component: styled(Link)({
    textDecoration: 'none',
    color: '#fff',
    margin: `0 ${theme.spacing.unit * 1.5}px`,
    ':hover': {
      borderBottom: '1px solid #fff'
    }
  })
})(
  styled(Typography)({
    fontSize: '1rem'
  })
);

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        imageOne: file(relativePath: {eq: "noobhustle-logo-white.png"}) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div
        style={{
          width: '100%',
          background: theme.palette.primary.light
        }}
      >
        <div
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: 1440,
            padding: '1.45rem 1.0875rem'
          }}
        >
          <Logo style={{display: 'inline-block'}}>
            <Link to="/">
              <Img fluid={data.imageOne.childImageSharp.fluid} />
            </Link>
          </Logo>
          <Hidden smDown implementation="css">
            <MainMenu style={{marginTop: '-30px'}}>
              <MainMenuItem
                activeStyle={{borderBottom: '1px solid #fff'}}
                to="/income-reports"
              >
                Income Reports
              </MainMenuItem>
              <MainMenuItem
                activeStyle={{borderBottom: '1px solid #fff'}}
                to="/recommended-tools"
              >
                Recommended Tools
              </MainMenuItem>
              <MainMenuItem
                activeStyle={{borderBottom: '1px solid #fff'}}
                to="/blog"
              >
                Blog
              </MainMenuItem>
              <MainMenuItem
                activeStyle={{borderBottom: '1px solid #fff'}}
                to="/about"
              >
                About
              </MainMenuItem>
            </MainMenu>
          </Hidden>
        </div>
      </div>
    )}
  />
);

export default Header;
