import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';

const FooterContain = styled.div({
  maxWidth: '1160px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff'
});

const Footer = () => (
  <FooterContain>
    <footer>© {new Date().getFullYear()} Noob Hustle</footer>
  </FooterContain>
);

export default Footer;
