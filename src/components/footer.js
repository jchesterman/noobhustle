import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';

const FooterWrap = styled.div({
  backgroundColor: theme.palette.primary.main,
  width: '100%'
});

const Footer = styled.div({
  maxWidth: '1160px',
  margin: '0 auto',
  padding: '40px',
  color: '#fff'
});

const FooterComponent = () => (
  <FooterWrap>
    <Footer>
      <footer>© {new Date().getFullYear()} Noob Hustle</footer>
    </Footer>
  </FooterWrap>
);

export default FooterComponent;
