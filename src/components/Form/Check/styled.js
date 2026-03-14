import styled from 'styled-components/native'       
 
import Icon from '@assets/icons' 

export const SelectItem = styled.TouchableOpacity.attrs({
})`           
    flex-direction: row; 
    align-items: center;
    padding: 3px 0; 
    ${ props => props.white ? ` 
        padding: 19px; 
        border-radius: 8px;
        margin-bottom: 8px;
    ` : `` }
    ${ props => props.centred ? ` 
        justify-content: center;
    ` : `` }
`;    
export const SelectDecoration = styled.View.attrs({
})`           
    width: 18px;
    height: 18px; 
    border-color: ${ props => props.white ? props.theme.white : props.theme.grey };
    border-width: 1px;
    margin-top: 5px;
    margin-right: 12px;
    align-items: center;
    justify-content: center;
    ${ props => props.active ? `
        background: ${ props.theme.primary };
        border-color: ${ props.theme.primary };
    ` : `` }
`;    

export const SelectItemIcon = styled(Icon).attrs(props => ({
    width: 20,
    height: 20,
    icon: 'check',
    fill: props.white ? props.theme.white : props.theme.white
}))`           
`;    

export const SelectItemText = styled.Text.attrs({
})`           
    font-family: Regular;
    font-size: 13px;   
    color: ${ props =>  props.active ? props.theme.primary : props.white ? props.theme.white : props.theme.black }; 
    padding-top: 5px;
`;    
 

export const InputLabel = styled.Text.attrs({
})`             
    color: ${ props => props.theme.black };
    font-size: 13px;
    font-family: Regular;
    margin: 0 0 6px 4px;
    ${
        props => props.white ? `
            color: ${ props.theme.white };
        ` : ``
    }
`;    
