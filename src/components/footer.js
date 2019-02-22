import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {Typography} from '@material-ui/core';

const FooterWrap = styled.div({
  backgroundColor: theme.palette.primary.main,
  width: '100%'
});

const Footer = styled.div({
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '40px',
  color: '#fff'
});

const FooterComponent = () => (
  <FooterWrap>
    <Footer>
      <footer>
        <Typography variant="body1" color="secondary">
          © {new Date().getFullYear()} Noob Hustle
        </Typography>
      </footer>
    </Footer>
  </FooterWrap>
);

export default FooterComponent;
