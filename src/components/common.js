import styled from '@emotion/styled';
import theme from '../themes/default';

const smDownBreakpoint = theme.breakpoints.down('sm');
export const Section = styled.section({
  maxWidth: 1440,
  margin: '0 auto',
  height: '100vh',
  minHeight: '800px',
  padding: `0 ${theme.spacing.unit * 8}px`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-of-type(1)': {
    height: '85vh'
  },
  [smDownBreakpoint]: {
    padding: theme.spacing.unit * 5
  }
});
