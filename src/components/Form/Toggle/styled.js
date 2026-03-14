import styled from 'styled-components/native';  

export const RowToggle = styled.View.attrs({  
})`   
    flex-direction: row; 
    align-items: center;
    gap: 12px;
`;  
export const ToggleInfos = styled.View.attrs({  
})`   
    flex-direction: row;
    align-items: center;
`;  
export const ToogleText = styled.Text.attrs({  
})`   
    font-family: Regular;  
    font-size: 13px; 
    text-transform: capitalize;
    color: ${ props =>  props.active ? props.theme.primary : props.white ? props.theme.white : props.theme.black }; 
`;   
export const ToggleContent = styled.TouchableOpacity.attrs({  
})`   
    width: 42px;
    height: 24px;
    background-color: ${ props => props.theme.grey };
    border-radius: 16px;
    flex-direction:row;
    align-items:center;
    padding: 0 5px;
    ${
        props => props.active ? `
            justify-content: flex-end;
            background-color: ${ props.theme.primary };
        ` : ``
    }
`;  
export const ToggleContentIn = styled.View.attrs({  
})`    
    width: 16px;
    height: 16px;
    border-radius: 12px;
    background-color: ${ props => props.theme.white };
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
