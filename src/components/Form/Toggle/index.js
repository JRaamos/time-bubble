import React, { useContext, useState } from 'react'

import {  
    RowToggle,
    ToggleInfos,
    ToogleText,  
    ToggleContent,
    ToggleContentIn,
    InputLabel
} from './styled'
  
import { UIManager, LayoutAnimation } from 'react-native'; 

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Toggle({ onChange, value, title, reverse }){ 


    const action = () => {
        if(onChange && typeof onChange === 'function'){
            LayoutAnimation.spring(() => {})
            onChange(!value)
        }
    } 
 
    return (
        <>  
            <RowToggle>
                {
                    !title || !reverse ? null :
                    <ToggleInfos>
                        <ToogleText active={!!value}>{ title }</ToogleText> 
                    </ToggleInfos>
                }
                <ToggleContent active={!!value} onPress={action}>
                    <ToggleContentIn />
                </ToggleContent>
                {
                    !title || reverse ? null :
                    <ToggleInfos>
                        <ToogleText active={!!value}>{ title }</ToogleText> 
                    </ToggleInfos>
                }
            </RowToggle> 
        </>
    )
}

