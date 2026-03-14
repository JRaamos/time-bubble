import styled from 'styled-components/native'          
 
export const BodyTitle = styled.Text.attrs({
})`
    font-size: 20px;
    font-family: Bold; 
    color: ${ props => props.theme.primary };
    text-align: center;
    margin-bottom: 20px;
`;    

export const BodyText = styled.Text.attrs({
})`
    font-size: 17px;
    font-family: Regular; 
    color: ${ props => props.theme.black };
    text-align: center;
    margin: 0 auto 40px;
    max-width: 300px;
`;    