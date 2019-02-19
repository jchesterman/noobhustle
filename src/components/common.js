import styled from '@emotion/styled';
import theme from '../themes/default';

const smDownBreakpoint = theme.breakpoints.down('sm');
export const Section = styled.section({
  maxWidth: 1160,
  margin: '0 auto',
  padding: theme.spacing.unit * 8,
  [smDownBreakpoint]: {
    padding: theme.spacing.unit * 5
  }
});
