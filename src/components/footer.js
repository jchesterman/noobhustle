import React from 'react';
import styled from '@emotion/styled';

const FooterContain = styled.div({
  maxWidth: '1160px',
  margin: '0 auto',
  paddingBottom: '40px'
});

const Footer = () => (
  <FooterContain>
    <footer>© {new Date().getFullYear()} Noob Hustle</footer>
  </FooterContain>
);

export default Footer;
