import styled from 'styled-components/native'     
import { TextInputMask } from 'react-native-masked-text'

import Icon from '@assets/icons' 

import { Input as KittenInput } from '@ui-kitten/components';

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


export const InputCustom = styled(KittenInput).attrs(props => ({
    placeholderTextColor: props.theme.grey,
    multiline: !!props.textarea,
    ...( props.textarea ? { height: 120 } : {} ),
    label: () => !props.labelText ? !null : <InputLabel>{ props.labelText }</InputLabel>,
    textStyle:{
        fontFamily:"Regular",
        fontSize: 16
    }
}))`
    background: ${props => props.theme.white} ;
    border-color: ${props => props.theme.lightgrey };
    color: ${props => props.theme.grey }; 
`;   

export const InputContainer = styled.View.attrs({
})`    
    position: relative;
`;   
export const InputContainerOld = styled.View.attrs({
})`    
    background: ${ props => props.theme.white };    
    border-radius: 5px;     
    border-width: .5px;
    border-color: ${ props => props.theme.black };
    elevation:1;  
    margin-bottom: 32px;
    position: relative;
`;   
 

export const InputInput = styled.TextInput.attrs(props => ({
    placeholderTextColor: props.theme.grey,
    multiline: !!props.textarea
}))`          
    background: ${ props => props.theme.white };   
    height: 40px;
    border-radius: 5px;

    font-family: Regular;
    color: ${ props => props.theme.grey };
    font-size: 14px;
    
    padding: 0 8px;
    ${
        props => props.textarea ? `
            height: 130px;
            padding: 8px;
        ` : ``
    }

`;    

export const InputMask = styled(TextInputMask).attrs(props => ({
    placeholderTextColor: props.theme.grey,
    type: props.mask
}))`          
`;    
  
export const CopyableContent = styled.View.attrs({
})`      
    flex-direction: row;
    align-items: center;
`;   

export const InputOut = styled.View.attrs({
})`      
    flex: 1;
`;   

export const ButtonCopy = styled.TouchableOpacity.attrs({
})`       
    padding: 12px 16px;
    flex-direction: row;
    align-items: center;

    padding: 0 8px;
`;   

export const ButtonCopyText = styled.Text.attrs({
})`      
    font-size: 14px;
    font-family: Bold;
    color: ${ props => props.theme.black };
`;   

export const ButtonCopyIcon = styled(Icon).attrs(props => ({
    stroke: props.theme.black,
    icon: 'copy',
    width: 18,
    height: 18
}))`
`;   

export const ButtonEyePassword = styled(Icon).attrs(props => ({
    stroke: props.theme.black,
    icon: props.visible ? 'eyeOff' : 'eyeOn',
    width: 18,
    height: 18
}))`
`;   

export const ButtonIcon = styled(Icon).attrs(props => ({
    stroke: props.theme.black,
    width: 18,
    height: 18
}))`
`;   