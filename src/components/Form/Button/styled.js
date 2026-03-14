import styled from 'styled-components/native'     
 
import Icon from '@assets/icons' 
import { Button as ButtonKitten } from '@ui-kitten/components'; 

import {  
    Load
} from '@ui/styled'  


export const ButtonCustom = styled(ButtonKitten).attrs({
})`
    background: ${ props => props.appearance === 'ghost' || props.appearance === 'outline' ? 'transparent' : props.primary ? props.theme.primary : props.theme.secondary };
    border-color: ${ props => props.appearance === 'ghost' ? 'transparent' :  props.primary ? props.theme.primary : props.theme.secondary };
    ${
        props => props.grey ? `
            background: ${ props.theme.lightgrey };
            border-color: ${ props.theme.lightgrey };
        ` : ``
    }
`;    

export const ButtonContent = styled.View.attrs({
})`     
    margin-bottom: 12px;
    ${
        props => props.spaced ? `
            margin-top: 12px;
        ` : ``
    }
`;    

export const ButtonIcon = styled(Icon).attrs(props => ({
    fill: props.theme.white,
    stroke: props.theme.white,
    width: 24,
    height: 24,
}))`     
`;

export const ButtonText = styled.Text.attrs({
})`
    color: ${ props => props.theme.white };
    ${ props => props.outline ? `color: ${ props.primary ? props.theme.primary : props.theme.secondary };` : `` }
    ${ props => props.link ? `color: ${ props.theme.grey };` : `` }
`;

export const LoadContent = styled.View.attrs({
})`     
    flex:1;
    align-items:center;
`;

export const LoadIndicator = styled(Load).attrs(props => ({
    color: ( props.outline || props.link ) ? ( props.primary ? props.theme.primary : props.theme.secondary ) : props.theme.white
}))`     
`;