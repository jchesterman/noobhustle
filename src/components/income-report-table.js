import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {Typography} from '@material-ui/core';

class IncomeReportTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const StyledTable = styled.table({
      width: '100%'
    });
    const StyledTableHead = styled.thead({
      background: theme.palette.primary.light,
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      textTransform: 'uppercase'
    });
    const StyledTh = styled.td({
      padding: '10px',
      border: 'none'
    });
    const StyleTableBody = styled.tbody({
      background: '#ddd',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    });
    const StyledTd = styled.td({
      padding: '10px'
    });
    const GreenText = styled.span({
      color: '#36c43b',
      borderBottom: '3px solid #36c43b',
      fontWeight: '600'
    });
    const RedText = styled.span({
      color: theme.palette.primary.light,
      borderBottom: `3px solid ${theme.palette.primary.light}`,
      fontWeight: '600'
    });
    const incomeObj = this.props.data;
    const reportKeys = Object.keys(incomeObj);
    let totalExpenses = 0;
    let totalEarnings = 0;
    Object.keys(this.props.data).forEach(function(key) {
      totalExpenses += incomeObj[key].expense;
      totalEarnings += incomeObj[key].earnings;
    });
    let income = totalEarnings - totalExpenses;
    const isPositive = income >= 0;
    income = Math.abs(income);
    return (
      <>
        <StyledTable>
          <StyledTableHead>
            <tr>
              <StyledTh>&nbsp;</StyledTh>
              <StyledTh>Expenses</StyledTh>
              <StyledTh>Earnings</StyledTh>
            </tr>
          </StyledTableHead>
          <StyleTableBody>
            {reportKeys.map(key => {
              return (
                <tr key={key}>
                  <StyledTd>{this.props.data[key].name}</StyledTd>
                  <StyledTd>
                    {this.props.data[key].expense
                      ? this.props.data[key].expense
                      : 0}
                  </StyledTd>
                  <StyledTd>
                    {this.props.data[key].earnings
                      ? this.props.data[key].earnings
                      : 0}
                  </StyledTd>
                </tr>
              );
            })}
            <tr>
              <StyledTd>
                <strong>Totals</strong>
              </StyledTd>
              <StyledTd>
                <strong>${totalExpenses}</strong>
              </StyledTd>
              <StyledTd>
                <strong>${totalEarnings}</strong>
              </StyledTd>
            </tr>
          </StyleTableBody>
        </StyledTable>
        <br />
        <Typography variant="h4">
          {isPositive ? (
            <GreenText>${income} made</GreenText>
          ) : (
            <RedText>${income} lost</RedText>
          )}
        </Typography>
        <br />
      </>
    );
  }
}

IncomeReportTable.propTypes = {
  data: PropTypes.object.isRequired
};

export default IncomeReportTable;
