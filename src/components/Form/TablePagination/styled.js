import styled from 'styled-components/native'   
import Button from "@components/Form/Button";

export const PaginationContainer = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  gap: 4px;
`;

export const PageButton = styled(Button)`

`;

export const PageButtonText = styled.Text`
  font-family: Regular;
  font-size: 14px;
  color: ${({ active, theme }) => active ? theme.white : theme.black};
`;



export const Rotate = styled.View`
  transform: rotate(180deg);
`;