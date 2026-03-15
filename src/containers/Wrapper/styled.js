import styled from 'styled-components/native'    

export const ContainerWhite = styled.View.attrs({
})`          
    background-color: ${ props => props.theme.white };
    flex:1;
    align-items: center;
    justify-content: center;
`;   

export const NoFragment = styled.View.attrs({
})`          
    flex:1;
`;   
