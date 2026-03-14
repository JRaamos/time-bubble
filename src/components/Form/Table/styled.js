import styled from 'styled-components/native';

export const TableContainer = styled.View`
  background-color: ${({ theme }) => theme.white};
  border-radius: 6px;
  overflow: hidden;
`;

export const TableHeaderRow = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.primary};
`;

export const TableHeaderCell = styled.Text`
  flex: 1;
  padding: 12px;
  color: white;
  font-weight: bold;
  text-align: ${({ alignLeft }) => (alignLeft ? 'left' : 'right')};
`;

export const TableRow = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.lightgrey};
`;

export const TableCell = styled.Text`
  flex: 1;
  padding: 12px;
  text-align: ${({ alignLeft }) => (alignLeft ? 'left' : 'right')};
`;
