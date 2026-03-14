import styled from 'styled-components/native'     
import Icon from '@assets/icons'    

export const HeaderAction = styled.TouchableOpacity.attrs({
})`            
    padding: 2px 16px;
    flex-direction: row;
    position: relative; 
`;   
export const HeaderActionIcon = styled(Icon).attrs(props => ({
    icon:'bell',
    width: 24,
    height: 24,
    fill: props.theme.primary
}))`            
`;   
export const HeaderActionDecoration = styled.View.attrs({
})`         
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background: ${ props => props.theme.accent }; 

    align-items: center;
    justify-content: center;  
    position: absolute; 
    bottom: -4px;
    right: 6px;
`;   
export const HeaderActionDecorationText = styled.Text.attrs({
})`            
    color: ${ props => props.theme.white }; 
    font-size: 14px;
    font-family: Regular;
`;