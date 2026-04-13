import styled from 'styled-components/native';  

export const RowToggle = styled.View.attrs({  
})`   
    flex-direction: row; 
    align-items: center;
    justify-content: ${ props => props.timer ? 'space-between' : 'flex-start' };
    gap: 12px;
`;  
export const ToggleInfos = styled.View.attrs({  
})`   
    flex-direction: row;
    align-items: center;
    ${ props => props.timer ? 'flex: 1;' : '' }
`;  
export const ToogleText = styled.Text.attrs({  
})`   
    font-family: ${ props => props.timer ? 'SemiBold' : 'Regular' };  
    font-size: ${ props => props.timer ? '14px' : '13px' }; 
    line-height: ${ props => props.timer ? '18px' : '16px' };
    text-transform: ${ props => props.timer ? 'none' : 'capitalize' };
    color: ${ props =>  props.timer ? (props.active ? props.theme.timerFace : props.theme.timerTextMuted) : props.active ? props.theme.primary : props.white ? props.theme.white : props.theme.black }; 
`;   
export const ToggleContent = styled.TouchableOpacity.attrs(props => ({  
    activeOpacity: props.disabled ? 1 : 0.82,
    disabled: props.disabled,
}))`   
    width: ${ props => props.timer ? '50px' : '42px' };
    height: ${ props => props.timer ? '28px' : '24px' };
    background-color: ${ props => props.timer ? (props.active ? props.theme.timerAccent : props.theme.timerSurfaceSoft) : props.theme.grey };
    border-radius: ${ props => props.timer ? '14px' : '16px' };
    flex-direction:row;
    align-items:center;
    padding: 0 ${ props => props.timer ? '3px' : '5px' };
    border-width: 1px;
    border-color: ${ props => props.timer ? (props.active ? props.theme.timerAccent : props.theme.lightshadow) : 'transparent' };
    opacity: ${ props => props.disabled ? 0.58 : 1 };
    ${
        props => props.active ? `
            justify-content: flex-end;
            background-color: ${ props.timer ? props.theme.timerAccent : props.theme.primary };
        ` : ``
    }
`;  
export const ToggleContentIn = styled.View.attrs({  
})`    
    width: ${ props => props.timer ? '20px' : '16px' };
    height: ${ props => props.timer ? '20px' : '16px' };
    border-radius: 12px;
    background-color: ${ props => props.timer ? (props.active ? props.theme.timerScreen : props.theme.timerFace) : props.theme.white };
    border-width: ${ props => props.timer ? '1px' : '0px' };
    border-color: ${ props => props.timer ? (props.active ? props.theme.timerSurface : props.theme.lightshadow) : 'transparent' };
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
