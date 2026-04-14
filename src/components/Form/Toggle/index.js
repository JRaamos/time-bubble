import React from 'react'

import {  
    RowToggle,
    ToggleInfos,
    ToogleText,  
    ToggleContent,
    ToggleContentIn,
} from './styled'
  
import { UIManager, LayoutAnimation } from 'react-native'; 

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Toggle({ disabled, onChange, reverse, timer, title, value }){ 
    const checked = !!value

    const action = () => {
        if(!disabled && onChange && typeof onChange === 'function'){
            LayoutAnimation.spring(() => {})
            onChange(!checked)
        }
    } 
 
    return (
        <>  
            <RowToggle timer={timer}>
                {
                    !title || !reverse ? null :
                    <ToggleInfos timer={timer}>
                        <ToogleText active={checked} timer={timer}>{ title }</ToogleText> 
                    </ToggleInfos>
                }
                <ToggleContent
                    accessibilityRole="switch"
                    accessibilityState={{ checked, disabled: !!disabled }}
                    active={checked}
                    disabled={disabled}
                    onPress={action}
                    timer={timer}
                >
                    <ToggleContentIn active={checked} timer={timer} />
                </ToggleContent>
                {
                    !title || reverse ? null :
                    <ToggleInfos timer={timer}>
                        <ToogleText active={checked} timer={timer}>{ title }</ToogleText> 
                    </ToggleInfos>
                }
            </RowToggle> 
        </>
    )
}
