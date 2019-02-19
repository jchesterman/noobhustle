import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {keyframes} from '@emotion/core';

const ripple = keyframes`
0% {
  top: 20px;
  left: 20px;
  width: 0;
  height: 0;
  opacity: 1;
}
100% {
  top: -1px;
  left: -1px;
  width: 41px;
  height: 41px;
  opacity: 0;
}
`;

const LoaderInner = styled.div({
  position: 'absolute',
  border: `4px solid ${theme.palette.primary.main}`,
  opacity: '1',
  borderRadius: '50%',
  animation: `${ripple}  1s cubic-bezier(0, 0.2, 0.8, 1) infinite`
});

const LoaderContain = styled.div({
  display: 'inline-block',
  position: 'absolute',
  width: '40px',
  height: '40px',
  marginLeft: '20px',
  marginTop: '28px',
  [LoaderInner]: {
    '&:nth-of-type(2)': {
      animationDelay: '-0.5s'
    }
  }
});

const Loader = () => (
  <LoaderContain>
    <LoaderInner />
    <LoaderInner />
  </LoaderContain>
);

export default Loader;
