import styled from 'styled-components/native'

export const Spacer = styled.View.attrs({
})`
    height: ${props => props.keyboardHeight || 0}px;
`;
