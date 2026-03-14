import styled from 'styled-components/native'     

import Icon from '@assets/icons'   

export const WrapperSelected = styled.View.attrs({
})`   
    flex-direction: row;
    flex-wrap: wrap;    
    border-width: .5px;
    border-color: ${ props => props.theme.black }; 
    border-radius: 5px;
    padding: 18px 8px 2px;
    margin: -32.5px 0 32px;
    justify-content: center;     
`;   

export const LoadContainer = styled.View.attrs({
})`   
    margin-bottom: 32px;
    padding: 16px;
    border-radius: 5px;
    border-width: .5px;
    border-color: ${ props => props.theme.lightgrey }; 
`;   

export const SelectedItem = styled.View.attrs({
})`   
    padding: 7px 12px; 
    flex-direction: row;
    align-items: center;
    margin-right: 16px;    
    margin-bottom: 16px;    
    background-color: ${ props => props.theme.white };   
    border-width: .5px;
    border-color: ${ props => props.theme.lightgrey };     
    border-radius: 5px;
`;   

export const SelectedItemText = styled.Text.attrs({
})`    
    font-family: Regular;
    font-size: 14px;  
    color: ${ props => props.theme.black }; 
`;   

export const SelectedItemRemove = styled.TouchableOpacity.attrs({
})`    
    width: 24px;
    height: 24px;
    border-radius: 16px;
    background-color: ${ props => props.theme.white };  
    margin: -12px -16px 16px 12px;
    align-items: center;
    justify-content: center;

    box-shadow: 0px 1px 1px ${ props => props.theme.lightshadow };    
    elevation: 1;
`;   

export const SelectedItemRemoveIcon = styled(Icon).attrs(props => ({
    icon: 'close',
    width: 14,
    height: 14,
    stroke: props.theme.black
}))`    
`;   
