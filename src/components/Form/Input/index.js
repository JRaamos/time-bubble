import React, { useState } from 'react'   
import Toast from 'react-native-toast-message'
import * as Clipboard from 'expo-clipboard';


import { Input as KittenInput } from '@ui-kitten/components';

import {  
    InputCustom,
    InputContainer,
    InputLabel, 
    InputInput,
    InputMask, 

    CopyableContent,
    InputOut,

    ButtonCopy,
    ButtonCopyText,
    ButtonCopyIcon,
    ButtonEyePassword,
    ButtonIcon

} from './styled'   

export default function Input({ value, onChangeText, label, placeholder, secureTextEntry, editable, textarea, mask, options, autoFocus, onSubmitEditing, copyable, returnKeyType, onBlur }){   
    const props = { value, onChangeText, labelText:label, label, placeholder, textarea, secureTextEntry, editable, mask, options,autoFocus, onSubmitEditing, returnKeyType, onBlur }  
    const GenericInput = mask ? InputMask : InputCustom

    const [visible, setVisible] = useState(!secureTextEntry)
 
    const copy = () => {
        Clipboard.setString(value);
        Toast.show({ type: 'info', text1: 'Copiado!' });
    }

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const accessoryRight = secureTextEntry ? 
        <ButtonCopy onPress={toggleVisible}>
            <ButtonEyePassword visible={visible} />
        </ButtonCopy>
    : copyable ? 
        <ButtonCopy onPress={copy}>
            <ButtonCopyText>Copiar</ButtonCopyText>
            <ButtonCopyIcon />
        </ButtonCopy>
    : null
 
    return (
        <>
            <InputContainer>
                <GenericInput customTextInput={InputCustom} size={"large"} accessoryRight={accessoryRight} { ...props } secureTextEntry={!visible} />   
            </InputContainer> 
        </>
    )
}